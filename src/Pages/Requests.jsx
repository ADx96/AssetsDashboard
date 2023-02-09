import { Tabs } from "antd";
import React from "react";
import DropRequests from "../components/dashboard/DropRequests";
import MoveRequests from "../components/dashboard/MoveRequests";

export const Requests = () => {
  const items = [
    {
      label: "طلبات نقل العهد",
      key: "1",
      children: (
        <>
          <h2 style={{ fontSize: "30px", textAlign: "center" }}>
            طلبات نقل العهد
          </h2>
          <MoveRequests />
        </>
      ),
    },
    {
      label: "طلبات اسقاط العهد",
      key: "2",
      children: (
        <>
          <h2 style={{ fontSize: "30px", textAlign: "center" }}>
            طلبات اسقاط العهد
          </h2>
          <DropRequests />
        </>
      ),
    },
  ];
  return <Tabs items={items} />;
};
