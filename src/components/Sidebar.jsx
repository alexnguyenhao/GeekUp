import { Layout, Menu, Drawer, Button } from "antd";
import { PictureOutlined, MenuOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { IdCardIcon } from "lucide-react";

const { Sider } = Layout;

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setCollapsed(mobile);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    {
      key: "albums",
      icon: <PictureOutlined className="size-4" />,
      label: "Albums",
      onClick: () => {
        navigate("/albums");
        setDrawerVisible(false);
      },
      className: "text-sm font-normal",
    },
    {
      key: "users",
      icon: <IdCardIcon className="size-4" />,
      label: "Users",
      onClick: () => {
        navigate("/users");
        setDrawerVisible(false);
      },
      className: "text-sm",
    },
  ];

  return (
    <>
      {isMobile ? (
        <div className="bg-white shadow-md p-4">
          <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={() => setDrawerVisible(true)}
            className="text-lg"
          />
          <Drawer
            title="Menu"
            placement="left"
            onClose={() => setDrawerVisible(false)}
            open={drawerVisible}
            width={200}
            styles={{
              body: { padding: 0 },
            }}
          >
            <Menu
              mode="inline"
              theme="light"
              selectedKeys={[location.pathname.split("/")[1]]}
              items={menuItems}
              className="border-none"
            />
          </Drawer>
        </div>
      ) : (
        <div className="bg-white shadow-md">
          <Sider
            width={200}
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
            theme="light"
          >
            <Menu
              mode="inline"
              theme="light"
              selectedKeys={[location.pathname.split("/")[1]]}
              items={menuItems}
              className="border-none"
            />
          </Sider>
        </div>
      )}
    </>
  );
}

export default Sidebar;
