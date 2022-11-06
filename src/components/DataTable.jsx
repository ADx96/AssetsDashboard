import React from "react";
import { Table } from "antd";

const DataTable = ({ columns, data, components }) => {
  return <Table columns={columns} components={components} dataSource={data} />;
};

export default DataTable;
