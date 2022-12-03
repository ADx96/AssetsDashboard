import React, { createRef, useState, useRef } from "react";
import { Form, Button, Input, Select } from "antd";
import qs from "qs";
import ReportsTable from "../ReportsTable";
import ReportsExport from "../dashboard/ReportsExport";

const RequestAssetDataForm = () => {
  const pdfRef = useRef(null);
  const formRef = createRef();
  const { Option } = Select;
  const [value, setValues] = useState("");

  const query = qs.stringify(
    {
      sort: ["id"],
      populate: "employee",
      filters: {
        Serial: {
          $contains: value.Selected === "Serial" ? value.text : "",
        },
        employee: {
          EmployeeId: {
            $contains: value.Selected === "EmployeeId" ? value.text : "",
          },
        },
      },
    },

    {
      pagination: {
        start: 0,
        limit: 1000,
      },
    },
    {
      encodeValuesOnly: true, // prettify URL
    }
  );

  const onFinish = (values) => {
    setValues(values);
    formRef.current?.resetFields();
  };
  return (
    <>
      {value ? (
        <div style={{ overflow: "auto" }}>
          <ReportsTable pdfRef={pdfRef} setValues={setValues} query={query} />
        </div>
      ) : (
        <>
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
            <Form.Item label="بحث عن طريق" name="Selected">
              <Select>
                <Option value={"EmployeeId"}>Employee ID</Option>
                <Option value={"Serial"}>Serial Number</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="ادخل البيانات"
              name="text"
              rules={[{ required: true, message: "Required!" }]}
            >
              <Input />
            </Form.Item>

            <div style={{ textAlign: "center" }}>
              <Button
                style={{ borderRadius: "5px", width: "150px" }}
                type="primary"
                htmlType="submit"
                size={"large"}
              >
                استعلام
              </Button>
            </div>
          </Form>
          <ReportsExport pdfRef={pdfRef} />
        </>
      )}
    </>
  );
};

export default RequestAssetDataForm;
