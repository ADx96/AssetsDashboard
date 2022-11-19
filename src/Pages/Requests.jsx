import { Tabs } from "antd";
import React from "react";
import CancelRequests from "../components/dashboard/CancelRequests";
import MoveRequests from "../components/dashboard/MoveRequests";

export const Requests = () => {
  const items = [
    {
      label: "طلبات نقل العهد",
      key: "item-1",
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
      key: "item-2",
      children: (
        <>
          <h2 style={{ fontSize: "30px", textAlign: "center" }}>
            طلبات اسقاط العهد
          </h2>
          <CancelRequests />
        </>
      ),
    },
  ];
  return <Tabs items={items} />;
};
