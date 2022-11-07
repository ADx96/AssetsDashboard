import { Button, Popconfirm, Space, Form, message } from "antd";
import { useState } from "react";
import AddModal from "../components/AddModal";
import DataTable from "../components/DataTable";
import { EditableCell } from "../components/Forms/Editable";
import EmployeeForm from "../components/Forms/EmployeeForm";
import { ContextProvider } from "../Hooks/ContextProvider";
import {
  useDeleteEmployeeMutation,
  useGetEmployeesQuery,
} from "../Redux/Api/EmployeesApi";

const Employees = () => {
  const [form] = Form.useForm();
  const { success } = message;
  const [deleteEmployee] = useDeleteEmployeeMutation();
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record.id === editingKey;
  const { data, isLoading } = useGetEmployeesQuery();

  const ApiData = data?.data.map((data) => {
    const id = data.id;
    return { id, ...data.attributes };
  });

  const handleDelete = async (id) => {
    deleteEmployee(id);
    success("تم الحذف بنجاح");
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = { ...ApiData };
      const index = newData.find((item) => key === item.id);

      newData.push(...row);
      setEditingKey("");
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const edit = (record) => {
    form.setFieldsValue({
      Employee: record.Employee,
      dataIndex: record.dataIndex,
      ...record,
    });
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
      title: "Add Date",
      dataIndex: "createdAt",
      key: "createdAt",
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

  if (isLoading) {
    return <h1>loading</h1>;
  }

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

  return (
    <ContextProvider>
      <AddModal title={"اضافة موظف "} children={<EmployeeForm />} />
      <div style={{ overflow: "auto" }}>
        <DataTable
          columns={mergedColumns}
          key="id"
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          data={ApiData}
        />
      </div>
    </ContextProvider>
  );
};

export default Employees;
