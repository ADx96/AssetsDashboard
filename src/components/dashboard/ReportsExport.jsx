import React, { createRef, useState } from "react";
import { Button, message, Form, Select, Input } from "antd";
import { CSVLink } from "react-csv";
import { useGetAssetsQuery } from "../../Redux/Api/AssetsApi";
import qs from "qs";

const ReportsExport = () => {
  const formRef = createRef();
  const { Option } = Select;
  const [value, setValues] = useState("");
  const { success } = message;

  const query = qs.stringify(
    {
      populate: "employee",
      filters: {
        employee: {
          Name: {
            $contains: value,
          },
          EmployeeId: {
            $contains: value,
          },
        },
      },
      pagination: {
        pageSize: 1000,
      },
    },
    {
      encodeValuesOnly: true, // prettify URL
    }
  );
  const { data, isLoading } = useGetAssetsQuery(query);

  const ApiData = data?.data.map((data) => {
    const id = data.id;
    const { attributes } = data;
    const employee = data.attributes.employee.data?.attributes;
    return { id, ...attributes, ...employee };
  });

  const onFinish = (values) => {
    setValues(values);
    formRef.current?.resetFields();
  };
  if (isLoading) {
    return <h1>loading</h1>;
  }

  return (
    <div style={{ marginTop: "30px", textAlign: "center" }}>
      <h2 style={{ fontSize: "30px", textAlign: "center" }}>csv طباعة العهد</h2>
      <Form
        name="basic"
        ref={formRef}
        layout="vertical"
        style={{ textAlign: "center" }}
        initialValues={{ remember: false }}
        onFinish={onFinish}
        labelCol={{
          sm: {
            span: 16,
            offset: 8,
          },
        }}
        wrapperCol={{
          span: 24,
          sm: {
            span: 8,
            offset: 8,
          },
        }}
        autoComplete="off"
      >
        <Form.Item label="اختار" name="Selected">
          <Select>
            <Option value={"AllEmployees"}>جميع الموظفين</Option>
            <Option value={"Employee"}>موظف</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Text"
          name="text"
          rules={[{ required: true, message: "Required!" }]}
        >
          <Input />
        </Form.Item>
        <CSVLink
          filename={"assets.csv"}
          data={ApiData}
          className="btn btn-primary"
          onClick={() => {
            success("The file is downloading");
          }}
        >
          <Button
            style={{ borderRadius: "5px", width: "150px" }}
            type="primary"
            htmlType="submit"
            size={"large"}
          >
            Export to CSV
          </Button>
        </CSVLink>
      </Form>
    </div>
  );
};

export default ReportsExport;
