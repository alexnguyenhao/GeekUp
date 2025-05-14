import { useNavigate } from "react-router-dom";
import { Eye } from "lucide-react";
import Pagination from "./Pagination";
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
function AlbumTable({ albums, users, page, pageSize, total, onPageChange }) {
  const navigate = useNavigate();
  return (
    <div className="w-full">
      <table className="w-full border border-gray-100 rounded-md shadow-sm bg-white">
        <thead className=" text-left">
          <tr>
            <th className="p-4 border border-gray-100">ID</th>
            <th className="p-4 border border-gray-100">Title</th>
            <th className="p-4 border border-gray-100">User</th>
            <th className="p-4 border border-gray-100">Actions</th>
          </tr>
        </thead>
        <tbody>
          {albums.map((album) => {
            const user = users.find((u) => u.id === album.userId);
            return (
              <tr key={album.id} className="hover:bg-gray-50">
                <td className="p-4 border border-gray-100">{album.id}</td>
                <td className="p-4 border border-gray-100">{album.title}</td>
                <td
                  className="p-4 border border-gray-100 cursor-pointer"
                  onClick={() => navigate(`/users/${user?.id}`)}
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={`https://ui-avatars.com/api/?name=${
                        user.name
                      }&background=${getColorFromName(user.name).slice(
                        1
                      )}&color=ffffff`}
                      alt={user?.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <span>{user?.name || "Unknown"}</span>
                  </div>
                </td>
                <td className="p-4 border border-gray-100 text-center">
                  <button
                    onClick={() => navigate(`/albums/${album.id}`)}
                    className="bg-white rounded-md flex gap-2 border border-gray-100 justify-between items-center px-2 py-1 hover:text-blue-500 hover:bg-gray-50 transition duration-200"
                  >
                    <Eye className="size-4" />
                    <span className="font-normal">Show</span>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination
        current={page}
        pageSize={pageSize}
        total={total}
        onChange={onPageChange}
      />
    </div>
  );
}

export default AlbumTable;
