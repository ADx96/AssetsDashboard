import React from "react";
import CancelRequests from "../components/dashboard/CancelRequests";

export const Requests = () => {
  return (
    <div>
      <h2 style={{ fontSize: "30px", textAlign: "center" }}>
        طلبات اسقاط العهد
      </h2>
      <CancelRequests />
    </div>
  );
};
