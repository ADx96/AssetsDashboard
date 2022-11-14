import { Table } from "antd";
import React from "react";
import { useGetCancelRequestsQuery } from "../../Redux/Api/RequestApi";

const query = {
  populate: "employee",
};
const CancelRequests = () => {
  const { data, isLoading } = useGetCancelRequestsQuery(query);

  const ApiData = data?.data.map((data) => {
    return { ...data };
  });

  const columns = [
    {
      title: "Employee Name",
      dataIndex: "Name",
      key: "Name",
      align: "center",
    },
    {
      title: "Employee I.D",
      dataIndex: "EmployeeId",
      key: "EmployeeId",
      align: "center",
    },
    {
      title: "SERIAL NUMBER",
      dataIndex: "SerialNumber",
      key: "SerialNumber",
      align: "center",
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

export default CancelRequests;
