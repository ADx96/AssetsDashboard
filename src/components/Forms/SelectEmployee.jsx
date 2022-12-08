import { Form, Select, message, Button } from "antd";
import React, { createRef, useState, useContext } from "react";

import qs from "qs";
import { useGetEmployeesQuery } from "../../Redux/Api/EmployeesApi";
import ModalContext from "../../Hooks/ContextProvider";
import { useUpdateAssetMutation } from "../../Redux/Api/AssetsApi";

const SelectEmployee = ({ id }) => {
  const { setModal } = useContext(ModalContext);
  const [updateAsset, isSuccess] = useUpdateAssetMutation();
  const { success } = message;
  const { Option } = Select;

  const formRef = createRef();
  const [search, setSearch] = useState("");

  const [scroll, setScroll] = useState({
    page: 1,
    size: 20,
  });

  const query = qs.stringify(
    {
      filters: {
        Name: {
          $contains: search,
        },
      },
      pagination: {
        page: scroll.page,
        pageSize: scroll.size,
      },
    },
    {
      encodeValuesOnly: true, // prettify URL
    }
  );
  const { data: resp, isLoading } = useGetEmployeesQuery(query);

  const total = resp?.meta.pagination.total;

  const handlePopupScroll = (e) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;

    if (bottom) {
      setScroll({
        page: scroll.size === scroll.size + 10 ? scroll.page + 1 : scroll.page,
        size: total > scroll.size ? scroll.size + 10 : scroll.size,
      });
    }
  };

  const onFinish = async (values) => {
    formRef.current?.resetFields();
    const update = {
      id,
      Submit: {
        employee: values.employee,
        isDropped: false,
      },
    };
    updateAsset(update);
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
      autoComplete="off"
    >
      <Form.Item
        label="Employee"
        name="employee"
        rules={[{ required: true, message: "Employee is Required!" }]}
      >
        <Select
          style={{ marginBottom: "10px", display: "block" }}
          showSearch
          allowClear
          onPopupScroll={handlePopupScroll}
          placeholder="Select a person"
          optionFilterProp="children"
          onSearch={(value) => setSearch(value)}
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
      <Button htmlType="submit">ارجاع</Button>
    </Form>
  );
};

export default SelectEmployee;
