import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Avatar, Image, Typography, Spin } from "antd";
import { IdCardIcon, LucideArrowLeft } from "lucide-react";
import { useUsers } from "../hooks/useUsers";
import { usePhotos } from "../hooks/usePhotos";

const { Title } = Typography;

// Hook mới để lấy album theo id
export function useAlbum(albumId) {
  return useQuery({
    queryKey: ["album", albumId],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/albums/${albumId}`
      );
      return data;
    },
    enabled: !!albumId,
  });
}

function getColorFromName(name) {
  const colors = [
    "#f56a00",
    "#7265e6",
    "#ffbf00",
    "#00a2ae",
    "#13c2c2",
    "#2f54eb",
    "#722ed1",
    "#eb2f96",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colors.length;
  return colors[index];
}

function AlbumDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: album,
    isLoading: albumLoading,
    error: albumError,
  } = useAlbum(id);
  const {
    data: users,
    isLoading: usersLoading,
    error: usersError,
  } = useUsers();
  const {
    data: photos,
    isLoading: photosLoading,
    error: photosError,
  } = usePhotos(id);
  const loading = albumLoading || usersLoading || photosLoading;
  const error = albumError || usersError || photosError;
  const user = users && album ? users.find((u) => u.id === album.userId) : null;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="text-red-500">{error.message}</span>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto shadow-sm rounded-xl">
      <div>
        <ol className="flex items-center space-x-2">
          <IdCardIcon className="size-4" />
          <span
            onClick={() => navigate("/albums")}
            className="text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            Albums
          </span>
          <span>/ Show</span>
        </ol>
        <div className="flex items-center cursor-pointer mt-2 mb-4">
          <LucideArrowLeft
            onClick={() => navigate("/albums")}
            className="hover:bg-gray-200 cursor-pointer"
          />
          <span className="text-[20px] font-semibold ml-4">Show Album</span>
        </div>
      </div>
      <div className="bg-white shadow-xl rounded-lg p-6 border border-gray-200">
        <div className="flex mb-6 border-b border-gray-200 p-6">
          <Avatar
            src={`https://ui-avatars.com/api/?name=${
              user?.name
            }&size=64&background=${getColorFromName(user?.name).slice(
              1
            )}&color=ffffff`}
            alt={`${user?.name}'s avatar`}
            size={30}
            className="border border-gray-300 shadow-sm"
          />
          <div className="ml-4">
            <span
              className="!text-base !font-semibold !leading-[25px] !text-[#3c88ed] cursor-pointer hover:!text-blue-700"
              onClick={() => navigate(`/users/${user?.id}`)}
            >
              {user?.name}
            </span>
            <div>
              <a
                href={`mailto:${user?.email}`}
                className="text-blue-500 hover:text-blue-700"
              >
                {user?.email}
              </a>
            </div>
          </div>
        </div>
        <Title level={4} className="mb-6 capitalize text-gray-800">
          {album?.title}
        </Title>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {photos.map((photo) => (
            <a
              key={photo.id}
              href={photo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block transform transition-transform duration-200 hover:scale-105"
            >
              <Image
                src={photo.thumbnailUrl}
                alt={photo.title}
                className="rounded border border-gray-200"
                preview={false}
                style={{ objectFit: "cover", aspectRatio: "1 / 1" }}
                loading="lazy"
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AlbumDetailPage;
