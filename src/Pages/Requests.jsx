import { Tabs } from "antd";
import React from "react";
import CancelRequests from "../components/dashboard/CancelRequests";
import MoveRequests from "../components/dashboard/MoveRequests";

export const Requests = () => {
  return (
    <Tabs>
      <Tabs.TabPane tab="طلبات نقل العهد" key="item-1">
        <h2 style={{ fontSize: "30px", textAlign: "center" }}>
          طلبات نقل العهد
        </h2>

        <MoveRequests />
      </Tabs.TabPane>
      <Tabs.TabPane tab="طلبات اسقاط العهد" key="item-2">
        <h2 style={{ fontSize: "30px", textAlign: "center" }}>
          طلبات اسقاط العهد
        </h2>

        <CancelRequests />
      </Tabs.TabPane>
    </Tabs>
  );
};
