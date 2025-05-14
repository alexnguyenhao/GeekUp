import { Avatar } from "antd";
import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
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

function UserTable({ users }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-md overflow-x-auto">
      <table className="min-w-[800px] w-full text-left border-collapse bg-white">
        <thead>
          <tr className="bg-white text-sm text-gray-700">
            <th className="p-4 hidden md:table-cell">ID</th>
            <th className="p-4">Avatar</th>
            <th className="p-4">Name</th>
            <th className="p-4">Email</th>
            <th className="p-4 hidden md:table-cell">Phone</th>
            <th className="p-4">Website</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="border-t border-gray-100 text-sm hover:bg-gray-50"
            >
              <td className="p-4 hidden md:table-cell">{user.id}</td>
              <td className="p-4">
                <img
                  src={`https://ui-avatars.com/api/?name=${
                    user.name
                  }&background=${getColorFromName(user.name).slice(
                    1
                  )}&color=ffffff`}
                  alt={user?.name}
                  className="size-[30px] rounded-full"
                />
              </td>
              <td className="p-4">{user.name}</td>
              <td className="p-4">
                <a
                  href={`mailto:${user.email}`}
                  className="text-blue-600 hover:underline"
                >
                  {user.email}
                </a>
              </td>
              <td className="p-4 hidden md:table-cell">
                <a
                  href={`tel:${user.phone}`}
                  className="text-blue-600 hover:underline"
                >
                  {user.phone}
                </a>
              </td>
              <td className="p-4">
                <a
                  href={`http://${user.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {user.website}
                </a>
              </td>
              <td className="p-4">
                <button
                  onClick={() => navigate(`/users/${user.id}`)}
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
  );
}

export default UserTable;
