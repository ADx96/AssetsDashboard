import React from "react";
import { Table, Form } from "antd";

const DataTable = ({
  columns,
  data,
  components,
  setCurrentPage,
  form,
  total,
  PageSize,
}) => {
  return (
    <Form form={form} component={false}>
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
    </Form>
  );
};

export default DataTable;
