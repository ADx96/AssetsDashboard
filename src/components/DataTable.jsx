import React from "react";
import { Table } from "antd";

const DataTable = ({ columns, data }) => {
  return <Table columns={columns} dataSource={data} />;
};

export default DataTable;
