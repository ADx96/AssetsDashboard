import React, { createRef, useState, useRef } from "react";
import { Form, Button, Input, Select } from "antd";
import qs from "qs";
import ReportsTable from "../ReportsTable";
import ReportsExport from "../dashboard/ReportsExport";
import { useGetAssetsQuery } from "../../Redux/Api/AssetsApi";

const RequestAssetDataForm = () => {
  const pdfRef = useRef(null);
  const formRef = createRef();
  const { Option } = Select;
  const [total, setTotal] = useState("");
  const [value, setValues] = useState("");

  const query = qs.stringify(
    {
      sort: ["id"],
      populate: "employee",
      filters: {
        Serial: {
          $contains: value.selected === "Serial" ? value.text : "",
        },
        employee: {},
      },
      pagination: {
        pageSize: total,
      },
    },
    {
      encodeValuesOnly: true, // prettify URL
    }
  );
  const { data, isLoading, refetch } = useGetAssetsQuery(query);

  const onFinish = (values) => {
    const getTotal = data?.meta.pagination.total;
    setTotal(getTotal);
    setValues(values);
    formRef.current?.resetFields();
    refetch();
  };
  return (
    <>
      {value.text ? (
        <div style={{ overflow: "auto" }}>
          <ReportsTable
            data={data}
            isLoading={isLoading}
            pdfRef={pdfRef}
            setValues={setValues}
            query={query}
          />
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
            <Form.Item label="بحث عن طريق" name="selected">
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
