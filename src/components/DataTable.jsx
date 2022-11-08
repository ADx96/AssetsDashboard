import React from "react";
import { Table } from "antd";

const DataTable = ({
  columns,
  data,
  components,
  setCurrentPage,
  total,
  PageSize,
}) => {
  return (
    <Table
      columns={columns}
      components={components}
      pagination={{
        total: total,
        PageSize: PageSize,
        onChange: (page) => {
          setCurrentPage(page);
        },
      }}
      dataSource={data}
    />
  );
};

export default DataTable;
