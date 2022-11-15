import { Table } from "antd";
import React from "react";
import { useGetMoveRequestsQuery } from "../../Redux/Api/RequestApi";

const query = {
  populate: "employee",
};
const MoveRequests = () => {
  const { data, isLoading } = useGetMoveRequestsQuery(query);
  const ApiData = data?.data.map((data) => {
    const employee = data.attributes.employee.data.attributes;
    return { ...data.attributes, ...employee };
  });
  console.log(ApiData);

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
      title: "Moved Employee Name",
      dataIndex: "MoveEmployee",
      key: "MoveEmployee",
      align: "center",
    },
    {
      title: "Reason",
      dataIndex: "Reason",
      key: "Reason",
      align: "center",
    },
    {
      title: "SERIAL NUMBER",
      dataIndex: "ItemSerial",
      key: "ItemSerial",
      align: "center",
    },
    {
      title: "createdAt",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center",
    },
  ];

  if (isLoading) {
    return <h1>loading</h1>;
  }

  return (
    <div style={{ overflow: "auto" }}>
      <Table
        rowClassName={() => "editable-row"}
        bordered
        dataSource={ApiData}
        columns={columns}
      />
    </div>
  );
};

export default MoveRequests;
