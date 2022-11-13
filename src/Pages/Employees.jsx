import { Button, Popconfirm, Space, Form, message, Input } from "antd";
import { useState } from "react";
import AddModal from "../components/AddModal";
import DataTable from "../components/DataTable";
import { EditableCell } from "../components/Forms/Editable";
import EmployeeForm from "../components/Forms/EmployeeForm";
import { ContextProvider } from "../Hooks/ContextProvider";
import {
  useDeleteEmployeeMutation,
  useGetEmployeesQuery,
  useUpdateEmployeeMutation,
} from "../Redux/Api/EmployeesApi";
import qs from "qs";

const Employees = () => {
  const [form] = Form.useForm();
  const { success } = message;
  const { Search } = Input;
  const [search, setSearch] = useState(null);
  const [deleteEmployee] = useDeleteEmployeeMutation();
  const [updateEmployee] = useUpdateEmployeeMutation();
  const reg = new RegExp(/^[0-9]+$/);
  const [editingKey, setEditingKey] = useState("");
  const [currentPage, setCurrentPage] = useState();
  const isEditing = (record) => record.id === editingKey;
  const query = qs.stringify(
    {
      filters: {
        Name: {
          $contains: !reg.test(search) ? search : "",
        },
        EmployeeId: {
          $contains: reg.test(search) ? search : "",
        },
      },
      pagination: {
        page: currentPage,
        pageSize: 10,
      },
    },
    {
      encodeValuesOnly: true, // prettify URL
    }
  );
  const { data, isLoading } = useGetEmployeesQuery(query);

  const ApiData = data?.data.map((data) => {
    const id = data.id;
    return { id, ...data.attributes };
  });

  const handleDelete = async (id) => {
    deleteEmployee(id);
    success("تم الحذف بنجاح");
  };

  const save = async (key) => {
    const row = await form.validateFields();
    const NewData = { row, editingKey };
    success("تم التعديل بنجاح");
    updateEmployee(NewData);
    setEditingKey("");
  };

  const edit = (record) => {
    form.setFieldsValue({
      EmployeeId: record.EmployeeId,
      Name: record.Name,
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

  const total = data?.meta.pagination.total;
  const PageSize = data?.meta.pagination.pageSize;

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
        <Search
          style={{ width: "40%" }}
          placeholder="Search By Employee Id And name"
          onSearch={(value) => {
            setSearch(value);
          }}
        />
        <DataTable
          form={form}
          columns={mergedColumns}
          key="id"
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          data={ApiData}
          total={total}
          PageSize={PageSize}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </ContextProvider>
  );
};

export default Employees;
