import { Table } from "antd";
import React from "react";
import { useGetAssetsQuery } from "../../Redux/Api/AssetsApi";
import qs from "qs";

const query = qs.stringify(
  {
    populate: "employee",

    filters: {
      isDropped: {
        $eq: false,
      },
    },
  },
  {
    encodeValuesOnly: true, // prettify URL
  }
);
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
      align: "center",
      key: "Name",
    },
    {
      title: "Employee I.D",
      dataIndex: "EmployeeId",
      key: "EmployeeId",
      align: "center",
    },
    {
      title: "SERIAL NUMBER",
      dataIndex: "Serial",
      align: "center",
      key: "Serial",
    },
    {
      title: "ITEM",
      dataIndex: "ItemName",
      align: "center",
      key: "ItemName",
    },

    {
      title: "Add Date",
      dataIndex: "createdAt",
      align: "center",
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
      pagination={false}
      rowKey={(record) => record.id}
      dataSource={ApiData}
      columns={columns}
    />
  );
};

export default LatestAssets;
