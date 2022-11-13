import { Table } from "antd";
import React from "react";
import { useGetCancelRequestsQuery } from "../../Redux/Api/RequestApi";

const query = {
  populate: "employee",
};
const MoveRequests = () => {
  const { data, isLoading } = useGetCancelRequestsQuery(query);

  const ApiData = data?.data.map((data) => {
    return { ...data };
  });

  const columns = [
    {
      title: "Employee Name",
      dataIndex: "Name",
      key: "Name",
    },
    {
      title: "Employee I.D",
      dataIndex: "EmployeeId",
      key: "EmployeeId",
    },
    {
      title: "Reason",
      dataIndex: "Reason",
      key: "Reason",
    },
    {
      title: "SERIAL NUMBER",
      dataIndex: "SerialNumber",
      key: "SerialNumber",
    },
  ];

  if (isLoading) {
    return <h1>loading</h1>;
  }

  return (
    <Table
      rowClassName={() => "editable-row"}
      bordered
      dataSource={ApiData}
      columns={columns}
    />
  );
};

export default MoveRequests;
