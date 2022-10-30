import React from "react";
import { Table } from "antd";
import { useGetEmployeesQuery } from "../Redux/Api/EmployeesApi";

const DataTable = ({ columns, data }) => {
  return <Table columns={columns} dataSource={data} />;
};

export default DataTable;
