import DataTable from "../components/DataTable";
import AddModal from "../components/AddModal";
import AssetsForm from "../components/Forms/AssetsForm";
import {
  useDeleteAssetMutation,
  useGetAssetsQuery,
} from "../Redux/Api/AssetsApi";
import { ContextProvider } from "../Hooks/ContextProvider";
import { Space, Button, message, Popconfirm, Form } from "antd";
import { EditableCell } from "../components/Forms/Editable";
import { useState } from "react";

const query = {
  populate: "employee",
};

const Assets = () => {
  const [form] = Form.useForm();
  const [deleteAsset] = useDeleteAssetMutation();
  const { success } = message;
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record.id === editingKey;
  const { data, isLoading } = useGetAssetsQuery(query);

  const ApiData = data?.data.map((data) => {
    const id = data.id;
    const { attributes } = data;
    const employee = data.attributes.employee.data?.attributes;
    return { id, ...attributes, ...employee };
  });

  const handleDelete = async (id) => {
    deleteAsset(id);
    success("تم الحذف بنجاح");
  };

  const save = async (key) => {};

  const edit = (record) => {
    setEditingKey(record.id);
  };
  const cancel = () => {
    setEditingKey("");
  };

  const columns = [
    {
      title: "Employee Name",
      dataIndex: "Name",
      key: "Name",
      editable: true,
    },
    {
      title: "Employee I.D",
      dataIndex: "EmployeeId",
      key: "EmployeeId",
      editable: true,
    },
    {
      title: "SERIAL NUMBER",
      dataIndex: "Serial",
      key: "Serial",
      editable: true,
    },
    {
      title: "ITEM",
      dataIndex: "ItemName",
      key: "ItemName",
      editable: true,
    },
    {
      title: "SPECIFICATION",
      dataIndex: "Specs",
      key: "Specs",
      editable: true,
    },
    {
      title: "OS",
      dataIndex: "os",
      key: "os",
      editable: true,
    },
    {
      title: "BUILDING",
      dataIndex: "Building",
      key: "Building",
      editable: true,
    },
    {
      title: "FlOOR",
      dataIndex: "Floor",
      key: "Floor",
      editable: true,
    },
    {
      title: "OFFICE",
      dataIndex: "Office",
      key: "Office",
      editable: true,
    },
    {
      title: "Add Date",
      dataIndex: "createdAt",
      key: "createdAt",
      editable: true,
    },
    {
      title: "Action",
      dataIndex: "operation",
      key: "operation",
      render: (_, record) => {
        const editable = isEditing(record);

        return (
          <div>
            {editable ? (
              <div style={{ display: "flex" }}>
                <Space>
                  <Popconfirm
                    title="Sure to save edit?"
                    onConfirm={() => save(record.key)}
                  >
                    <Button
                      style={{
                        marginRight: 8,
                      }}
                    >
                      Save
                    </Button>
                  </Popconfirm>

                  <Button onClick={cancel}>Cancel</Button>
                </Space>
              </div>
            ) : (
              <div style={{ display: "flex" }}>
                <Space>
                  <Button
                    disabled={editingKey !== ""}
                    onClick={() => edit(record)}
                  >
                    Edit
                  </Button>
                  <Popconfirm
                    title="Sure to delete?"
                    onConfirm={() => handleDelete(record.id)}
                  >
                    <Button>Delete</Button>
                  </Popconfirm>
                </Space>
              </div>
            )}
          </div>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  if (isLoading) {
    return <h1>loading</h1>;
  }

  return (
    <ContextProvider>
      <AddModal title={"اضافة بيانات العهدة"} children={<AssetsForm />} />
      <div style={{ overflow: "auto" }}>
        <Form form={form} component={false}>
          <DataTable
            data={ApiData}
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            columns={mergedColumns}
          />
        </Form>
      </div>
    </ContextProvider>
  );
};

export default Assets;
