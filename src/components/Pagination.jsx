import { Pagination as AntPagination } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import qs from "qs";

function Pagination({ current, pageSize, total, onChange }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (page, size) => {
    onChange(page, size);
    const query = qs.stringify({ page, pageSize: size });
    navigate(`${location.pathname}?${query}`);
  };

  return (
    <div className="mt-4 flex justify-end">
      <AntPagination
        current={current}
        pageSize={pageSize}
        total={total}
        onChange={handleChange}
        showSizeChanger
        pageSizeOptions={["10", "20", "50", "100"]}
      />
    </div>
  );
}

export default Pagination;
