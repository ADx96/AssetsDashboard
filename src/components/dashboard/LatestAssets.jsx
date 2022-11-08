import { Table } from "antd";
import React from "react";
import { useGetAssetsQuery } from "../../Redux/Api/AssetsApi";

const query = {
  populate: "employee",
};
const LatestAssets = () => {
  const { data, isLoading } = useGetAssetsQuery(query);

  const ApiData = data?.data.slice(-5).map((data) => {
    const id = data.id;
    const { attributes } = data;
    const employee = data.attributes.employee.data?.attributes;
    return { id, ...attributes, ...employee };
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
      title: "SERIAL NUMBER",
      dataIndex: "Serial",
      key: "Serial",
    },
    {
      title: "ITEM",
      dataIndex: "ItemName",
      key: "ItemName",
    },

    {
      title: "Add Date",
      dataIndex: "createdAt",
      key: "createdAt",
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

export default LatestAssets;
