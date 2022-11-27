import React, { createRef, useState } from "react";
import { Button, message, Form, Select, Input, Space } from "antd";
import { CSVLink } from "react-csv";
import { useGetAssetsQuery } from "../../Redux/Api/AssetsApi";
import qs from "qs";
import ExportPdf from "../ExportPdf";

const ReportsExport = () => {
  const formRef = createRef();
  const { Option } = Select;
  const [value, setValues] = useState("");
  const [option, setOption] = useState("");

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
        start: 0,
        limit: -1,
      },
    },
    {
      encodeValuesOnly: true, // prettify URL
    }
  );
  const { data, isLoading, refetch } = useGetAssetsQuery(query);

  const ApiData = data?.data.map((data) => {
    const { Serial, ItemName, Building, Floor, Office, CreatedAt } =
      data.attributes;
    const employee = data.attributes.employee.data?.attributes;
    const { EmployeeId, Name } = employee;

    return {
      EmployeeId,
      Name,
      Serial,
      ItemName,
      Building,
      Floor,
      Office,
      CreatedAt,
    };
  });

  const onFinish = (values) => {
    setValues(values);
    formRef.current?.resetFields();
    refetch();
  };

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
          <Select onChange={(value) => setOption(value)}>
            <Option value={"AllEmployees"}>جميع الموظفين</Option>
            <Option value={"Employee"}>موظف</Option>
          </Select>
        </Form.Item>
        {option !== "AllEmployees" && (
          <Form.Item
            label="ادخل البيانات"
            name="text"
            rules={[{ required: true, message: "Required!" }]}
          >
            <Input />
          </Form.Item>
        )}
        <Space>
          {!isLoading && (
            <Button
              style={{ borderRadius: "5px", width: "150px" }}
              type="primary"
              htmlType="submit"
              size={"large"}
            >
              <CSVLink
                filename={"assets.csv"}
                data={ApiData}
                className="btn btn-primary"
                onClick={() => {
                  success("The file is downloading");
                }}
              >
                Export to CSV
              </CSVLink>
            </Button>
          )}
          <ExportPdf />
        </Space>
      </Form>
    </div>
  );
};

export default ReportsExport;
