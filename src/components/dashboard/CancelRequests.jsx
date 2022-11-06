import { Table } from "antd";
import React from "react";
import { useGetCancelRequestsQuery } from "../../Redux/Api/RequestApi";

const query = {
  populate: "employee",
};
const CancelRequests = () => {
  const { data, isLoading } = useGetCancelRequestsQuery(query);

  const ApiData = data?.data.slice(0, 5).map((data) => {
    const id = data.id;
    const { attributes } = data;
    const employee = data.attributes.employee.data?.attributes;
    return { id, ...attributes, ...employee };
  });
  console.log(ApiData);

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

export default CancelRequests;
