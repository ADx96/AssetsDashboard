import React, { createRef, useContext } from "react";
import { Col, Row, Form, Space, Button, Select, Input, message } from "antd";
import ModalContext from "../../Hooks/ContextProvider";
import { useCreateAssetMutation } from "../../Redux/Api/AssetsApi";
import { useGetEmployeesQuery } from "../../Redux/Api/EmployeesApi";

const AssetsForm = () => {
  const { Option } = Select;

  const { data: resp, isLoading } = useGetEmployeesQuery();

  const onSearch = (value) => {
    console.log("search:", value);
  };
  const formRef = createRef();
  const { setModal } = useContext(ModalContext);

  const { success } = message;
  const [createAsset, isSuccess] = useCreateAssetMutation();

  const onFinish = async (values) => {
    formRef.current?.resetFields();
    const data = { data: values };
    await createAsset(data);
    setModal(false);
    if (isSuccess) success("تم الاضافة بنجاح");
  };

  return (
    <Form
      name="basic"
      ref={formRef}
      layout={"vertical"}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      // onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Space direction="vertical" size="middle" style={{ display: "flex" }}>
        <Row gutter={16}>
          <Col className="gutter-row" span={24} md={{ span: 12 }}>
            <Form.Item
              label="SERIAL NUMBER"
              name="Serial"
              rules={[{ required: true, message: "Serial is Required!" }]}
            >
              <Input
                style={{ marginBottom: "10px" }}
                placeholder="Basic usage"
              />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={24} md={{ span: 12 }}>
            <Form.Item
              label="ITEM"
              name="ItemName"
              rules={[{ required: true, message: "Item is Required!" }]}
            >
              <Input
                style={{ marginBottom: "10px" }}
                placeholder="Basic usage"
              />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={24} md={{ span: 12 }}>
            <Form.Item
              label="SPECIFICATION"
              name="Specs"
              rules={[
                { required: true, message: "Specifications is Required!" },
              ]}
            >
              <Input
                style={{ marginBottom: "10px" }}
                placeholder="Basic usage"
              />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={24} md={{ span: 12 }}>
            <Form.Item
              label="OS"
              name="os"
              rules={[{ required: true, message: "OS is Required!" }]}
            >
              <Input
                style={{ marginBottom: "10px" }}
                placeholder="Basic usage"
              />
            </Form.Item>
          </Col>
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
                onSearch={onSearch}
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
          <Col className="gutter-row" span={24} md={{ span: 12 }}>
            <Form.Item
              label="Building"
              name="Building"
              rules={[{ required: true, message: "Building is Required!" }]}
            >
              <Input
                style={{ marginBottom: "10px" }}
                placeholder="Basic usage"
              />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={24} md={{ span: 12 }}>
            <Form.Item
              label="Floor"
              name="Floor"
              rules={[{ required: true, message: "EmployeeId is Required!" }]}
            >
              <Input
                style={{ marginBottom: "10px" }}
                placeholder="Basic usage"
              />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={24} md={{ span: 12 }}>
            <Form.Item
              label="Office"
              name="Office"
              rules={[{ required: true, message: "EmployeeId is Required!" }]}
            >
              <Input
                style={{ marginBottom: "10px" }}
                placeholder="Basic usage"
              />
            </Form.Item>
          </Col>
        </Row>
        <div style={{ textAlign: "center" }}>
          <Button
            style={{ borderRadius: "5px", width: "150px" }}
            type="primary"
            htmlType="=submit"
            size={"large"}
          >
            اضاف
          </Button>
        </div>
      </Space>
    </Form>
  );
};

export default AssetsForm;
