import React from "react";
import { Table, Form } from "antd";

const DataTable = ({
  columns,
  data,
  components,
  setCurrentPage,
  form,
  rowKey,
  total,
  PageSize,
}) => {
  return (
    <Form form={form} component={false}>
      <Table
        columns={columns}
        rowKey={rowKey}
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
    </Form>
  );
};

export default DataTable;
