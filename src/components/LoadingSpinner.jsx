import { Spin } from "antd";

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-64">
      <Spin size="large" />
    </div>
  );
}

export default LoadingSpinner;
