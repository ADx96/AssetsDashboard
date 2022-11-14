import { Table } from "antd";
import React from "react";
import { useGetAssetsQuery } from "../Redux/Api/AssetsApi";

const ReportsTable = ({ query }) => {
  const { data, isLoading } = useGetAssetsQuery(query);

  const ApiData = data?.data.map((data) => {
    const id = data.id;
    const { attributes } = data;
    const employee = data.attributes.employee.data?.attributes;

    return { id, ...attributes, ...employee };
  });

  const columns = [
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
      title: "SPECIFICATION",
      dataIndex: "Specs",
      key: "Specs",
      editable: true,
    },
    {
      title: "OS",
      dataIndex: "os",
      key: "os",
      editable: true,
    },
    {
      title: "BUILDING",
      dataIndex: "Building",
      key: "Building",
      editable: true,
    },
    {
      title: "FlOOR",
      dataIndex: "Floor",
      key: "Floor",
      editable: true,
    },
    {
      title: "OFFICE",
      dataIndex: "Office",
      key: "Office",
      editable: true,
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
  const total = data?.meta.pagination.total;
  const PageSize = data?.meta.pagination.pageSize;

  const Name = ApiData[0].employee.data.attributes.Name;
  const Id = ApiData[0].employee.data.attributes.EmployeeId;
  return (
    <>
      <h2>Name:{Name} </h2>
      <h2>Employee ID: {Id}</h2>

      <Table
        rowClassName={() => "editable-row"}
        bordered
        total={total}
        PageSize={PageSize}
        dataSource={ApiData}
        columns={columns}
      />
    </>
  );
};

export default ReportsTable;
