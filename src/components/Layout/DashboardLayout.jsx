import { PieChartOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Menu, Card, Divider } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("Dashboard", "Dashboard", <PieChartOutlined />),
  getItem("Employees", "Employees", <UserOutlined />),
  getItem("Assets", "Assets", <UserOutlined />),
];

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selected, setSelected] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (key) => {
    let path = "";
    switch (key) {
      case "Dashboard":
        path = "/Dashboard";
        break;
      case "Employees":
        path = "/Employees";
        break;
      case "Assets":
        path = "/Assets";
        break;
      default:
    }

    navigate(`${path}`);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div
          style={{ position: "relative", textAlign: "center", top: "10px" }}
          className="logo"
        >
          <img src="/images/logo.png" width="70" alt="" />
        </div>
        <Divider />
        <Menu
          theme="dark"
          selectedKeys={[location.pathname.substring(1)]}
          mode="inline"
          onClick={(value) => handleNavigation(value.key)}
          items={items}
        />
      </Sider>
      <Layout className="site-layout">
        <Header style={{ backgroundColor: "white" }} />
        <Content style={{ margin: "0 16px" }}>
          <Card
            style={{
              width: "100%",
              margin: "auto",
              top: "5rem",
              position: "relative",
            }}
          >
            <Outlet />
          </Card>
        </Content>
        <Footer style={{ textAlign: "center" }}>Kuwait University</Footer>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
