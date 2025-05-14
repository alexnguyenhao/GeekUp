import { useState } from "react";
import { useLocation } from "react-router-dom";
import qs from "qs";
import AlbumTable from "../components/AlbumTable";
import { useAlbums } from "../hooks/useAlbums";
import { useUsers } from "../hooks/useUsers";
import LoadingSpinner from "../components/LoadingSpinner";

function AlbumsPage() {
  const location = useLocation();
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });
  const [page, setPage] = useState(parseInt(query.page) || 1);
  const [pageSize, setPageSize] = useState(parseInt(query.pageSize) || 10);

  const { data: albumsData, isLoading: albumsLoading } = useAlbums(
    page,
    pageSize
  );
  const { data: users, isLoading: usersLoading } = useUsers();

  if (albumsLoading || usersLoading) return <LoadingSpinner />;

  const handlePageChange = (newPage, newPageSize) => {
    setPage(newPage);
    setPageSize(newPageSize);
  };

  return (
    <div>
      <AlbumTable
        albums={albumsData?.albums || []}
        users={users || []}
        page={page}
        pageSize={pageSize}
        total={albumsData?.total || 0}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default AlbumsPage;
