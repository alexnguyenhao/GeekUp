import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";
import { IdCardIcon, LucideArrowLeft, Eye } from "lucide-react";
import { useUsers } from "../hooks/useUsers";
import { useUserAlbums } from "../hooks/useUserAlbums";
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

function UserDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: users, isLoading: usersLoading } = useUsers();
  const { data: albums, isLoading: albumsLoading } = useUserAlbums(id);
  if (usersLoading || albumsLoading) return <LoadingSpinner />;
  const user = users.find((u) => u.id === parseInt(id));
  return (
    <div className="max-w-4xl mx-auto">
      <ol className="flex items-center space-x-2">
        <IdCardIcon className="size-4" />
        <span
          onClick={() => navigate(-1)}
          className="text-gray-400 hover:text-gray-600 cursor-pointer"
        >
          User
        </span>
        <span>/ Show </span>
      </ol>
      <div className="flex items-center cursor-pointer mt-2 mb-4">
        <LucideArrowLeft
          onClick={() => navigate(-1)}
          className=" hover:bg-gray-200 cursor-pointer"
        />
        <span className="text-[20px] font-semibold ml-4">Show User</span>
      </div>
      <div className="bg-white shadow-xl rounded-lg p-6 border border-gray-200">
        <div className="flex text-inherited mb-4">
          <img
            src={`https://ui-avatars.com/api/?name=${
              user.name
            }&background=${getColorFromName(user.name).slice(1)}&color=ffffff`}
            alt={user?.name}
            className="w-8 h-8 rounded-full"
          />
          <div className="ml-4">
            <h2 className="text-2xl font-semibold text-blue-500 ">
              {user.name}
            </h2>
            <a
              href={`mailto:${user.email}`}
              className="text-blue-600 hover:underline"
            >
              {user.email}
            </a>
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg mb-4">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="px-4 py-4 border border-gray-200 text-left">
                  ID
                </th>
                <th className="px-4 py-4 border border-gray-200 text-left">
                  Album Title
                </th>
                <th className="px-4 py-4 border border-gray-200 text-left">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {albums.map((album) => (
                <tr key={album.id}>
                  <td className="px-4 py-4 border border-gray-200">
                    {album.id}
                  </td>
                  <td className="px-4 py-4 border border-gray-200">
                    {album.title}
                  </td>
                  <td className="px-4 py-4 border border-gray-200 text-center">
                    <button
                      onClick={() => navigate(`/albums/${album.id}`)}
                      className="bg-white rounded-md flex gap-2 border border-gray-200 justify-between items-center px-2 py-1 hover:text-blue-500 hover:bg-gray-50 transition duration-200"
                    >
                      <Eye className="size-4" />
                      <span className="font-normal">Show</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UserDetailPage;
