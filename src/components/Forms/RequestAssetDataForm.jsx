import React, { createRef } from "react";
import { Col, Form, Space, Button, message, Select } from "antd";
import qs from "qs";
import {
  useGetEmployeeByIdQuery,
  useGetEmployeesQuery,
} from "../../Redux/Api/EmployeesApi";

const RequestAssetDataForm = () => {
  const formRef = createRef();
  const { Option } = Select;
  const { success } = message;
  const query = qs.stringify(
    {
      pagination: {
        pageSize: 100,
      },
    },
    {
      encodeValuesOnly: true, // prettify URL
    }
  );
  const { data: resp, isLoading } = useGetEmployeesQuery(query);
  const { getEmployee } = useGetEmployeeByIdQuery();

  const onFinish = async (values) => {
    const NewData = { values, query };
    formRef.current?.resetFields();
    await getEmployee(NewData);
    success("تم الاضافة بنجاح");
  };
  return (
    <Form
      name="basic"
      ref={formRef}
      layout={"vertical"}
      initialValues={{ remember: false }}
      onFinish={onFinish}
      autoComplete="off"
      resetFields
    >
      <Space direction="vertical" size="middle" style={{ display: "flex" }}>
        <Col className="gutter-row" span={24} md={{ span: 12 }}>
          <Form.Item
            label="Employee"
            name="employee"
            rules={[{ required: true, message: "Employee is Required!" }]}
          >
            <Select
              style={{ marginBottom: "10px", display: "block" }}
              showSearch
              placeholder="Select a person"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }
            >
              {isLoading ? (
                <>loading...</>
              ) : (
                resp.data.map((data) => {
                  return (
                    <Option key={data.id} value={data.id}>
                      {data.attributes.Name}
                    </Option>
                  );
                })
              )}
            </Select>
          </Form.Item>
        </Col>
        <div style={{ textAlign: "center" }}>
          <Button
            style={{ borderRadius: "5px", width: "150px" }}
            type="primary"
            htmlType="submit"
            size={"large"}
          >
            طلب
          </Button>
        </div>
      </Space>
    </Form>
  );
};

export default RequestAssetDataForm;
