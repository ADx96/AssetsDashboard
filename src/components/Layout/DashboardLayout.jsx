import {
  PieChartOutlined,
  UserOutlined,
  TagsOutlined,
  AreaChartOutlined,
  UserDeleteOutlined,
  PullRequestOutlined,
} from "@ant-design/icons";
import {
  Layout,
  Menu,
  Card,
  Divider,
  Button,
  Space,
  Popover,
  Badge,
} from "antd";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useAppDispatch } from "../../Hooks/ReduxHooks";
import { logOut } from "../../Redux/Features/AuthSlice";
import { BellOutlined } from "@ant-design/icons";
import {
  useGetDropRequestsQuery,
  useGetMoveRequestsQuery,
} from "../../Redux/Api/RequestApi";

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
  getItem("Assets", "Assets", <TagsOutlined />),
  getItem("DroppedAssets", "DroppedAssets", <UserDeleteOutlined />),
  getItem("Requests", "Requests", <PullRequestOutlined />),
  getItem("Reports", "Reports", <AreaChartOutlined />),
];

const DashboardLayout = () => {
  const { data, isLoading } = useGetMoveRequestsQuery({ pollingInterval: 120 });
  const { data: data2, isLoading: isLoading2 } = useGetDropRequestsQuery({
    pollingInterval: 120,
  });

  const [collapsed, setCollapsed] = useState(false);
  const [Notifications, setNotifications] = useState({
    MoveRequests: [],
    DeleteRequests: [],
  });

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const SignOut = () => {
    dispatch(logOut());
    navigate("/");
  };

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
      case "Requests":
        path = "/Requests";
        break;
      case "Reports":
        path = "/Reports";
        break;
      case "DroppedAssets":
        path = "/DroppedAssets";
        break;
      default:
    }

    navigate(`${path}`);
  };

  useEffect(() => {
    const LastMoveRequests = data?.data?.map((data) => {
      return { ...data.attributes };
    });

    const LastDeleteRequests = data2?.data?.map((data2) => {
      return { ...data2.attributes };
    });

    setNotifications({
      MoveRequests: LastMoveRequests,
      DeleteRequests: LastDeleteRequests,
    });
  }, [data, data2]);

  const MoveRequestsCount = () => {
    if (isLoading2 || isLoading) {
      return;
    }
    const total =
      Notifications.MoveRequests?.length + Notifications.DeleteRequests?.length;

    return total;
  };

  const NotificationsContent = () => {
    const message = Notifications.MoveRequests.map((request, key) => {
      return (
        <div
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/Requests")}
          key={key}
        >
          <Card>
            <li> New Move Requests</li>
            <li> {request.createdAt}</li>
          </Card>
        </div>
      );
    });
    const message1 = Notifications.DeleteRequests.map((request, key) => {
      return (
        <div
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/Requests")}
          key={key}
        >
          <Card>
            <li> New Delete Requests</li>
            <li> {request.createdAt}</li>
          </Card>
        </div>
      );
    });
    return (
      <Space style={{ overflow: "auto" }} direction="vertical">
        {message.length > 0 && message}
        {message1.length > 0 && message1}
      </Space>
    );
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
        <Header style={{ backgroundColor: "white" }}>
          <div style={{ textAlign: "right" }}>
            <Space>
              <Popover
                placement="bottom"
                title={"Notifications"}
                content={<NotificationsContent />}
                trigger="click"
              >
                <div style={{ marginRight: "10px" }}>
                  <Badge count={MoveRequestsCount()}>
                    <Button
                      type="primary"
                      shape="circle"
                      icon={<BellOutlined />}
                      size={"large"}
                    />
                  </Badge>
                </div>
              </Popover>

              <Button onClick={SignOut}>تسجيل الاخروج</Button>
            </Space>
          </div>
        </Header>
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
        <Footer style={{ textAlign: "center", marginTop: "100px" }}>
          Kuwait University
        </Footer>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
