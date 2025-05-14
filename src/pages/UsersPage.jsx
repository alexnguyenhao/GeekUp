import UserTable from "../components/UserTable";
import { useUsers } from "../hooks/useUsers";
import LoadingSpinner from "../components/LoadingSpinner";

function UsersPage() {
  const { data: users, isLoading } = useUsers();

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen">
      <div>
        <h4 className="text-[20px] font-semibold text-neutral-900 m-0 p-2">
          Users
        </h4>
      </div>
      <UserTable users={users || []} />
    </div>
  );
}

export default UsersPage;
