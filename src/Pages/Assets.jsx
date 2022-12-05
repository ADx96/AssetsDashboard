import DataTable from "../components/DataTable";
import AddModal from "../components/AddModal";
import AssetsForm from "../components/Forms/AssetsForm";
import {
  useDeleteAssetMutation,
  useGetAssetsQuery,
  useUpdateAssetMutation,
} from "../Redux/Api/AssetsApi";
import { ContextProvider } from "../Hooks/ContextProvider";
import { Space, Button, message, Popconfirm, Form, Input } from "antd";
import { EditableCell } from "../components/Forms/Editable";
import { useState } from "react";
import qs from "qs";

const Assets = () => {
  const [form] = Form.useForm();
  const [deleteAsset] = useDeleteAssetMutation();
  const [updateAsset] = useUpdateAssetMutation();
  const [search, setSearch] = useState(null);
  const reg = new RegExp(/^[0-9]+$/);

  const { Search } = Input;
  const { success } = message;
  const [currentPage, setCurrentPage] = useState();
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record.id === editingKey;
  const query = qs.stringify(
    {
      populate: "employee",
      filters: {
        isDropped: {
          $eq: false,
        },
        employee: {
          Name: {
            $contains: !reg.test(search) ? search : "",
          },
          EmployeeId: {
            $contains: reg.test(search) ? search : "",
          },
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

  const { data, isLoading, refetch } = useGetAssetsQuery(query);

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

  const save = async (key) => {
    const Submit = await form.validateFields();
    const id = editingKey;
    const NewData = { Submit, id };
    success("تم التعديل بنجاح");
    updateAsset(NewData);
    success("تم التعديل بنجاح");
    setEditingKey("");
  };

  const edit = (record) => {
    form.setFieldsValue({
      ItemName: record.ItemName,
      Serial: record.Serial,
      Specs: record.Specs,
      os: record.os,
      Building: record.Building,
      Floor: record.Floor,
      Office: record.Office,
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
      align: "center",
    },
    {
      title: "Employee I.D",
      dataIndex: "EmployeeId",
      key: "EmployeeId",
      align: "center",
    },
    {
      title: "SERIAL NUMBER",
      dataIndex: "Serial",
      key: "Serial",
      editable: true,
      align: "center",
    },
    {
      title: "ITEM",
      dataIndex: "ItemName",
      key: "ItemName",
      editable: true,
      align: "center",
    },
    {
      title: "SPECIFICATION",
      dataIndex: "Specs",
      key: "Specs",
      editable: true,
      align: "center",
    },
    {
      title: "OS",
      dataIndex: "os",
      key: "os",
      align: "center",
      editable: true,
    },
    {
      title: "BUILDING",
      dataIndex: "Building",
      key: "Building",
      editable: true,
      align: "center",
    },
    {
      title: "FlOOR",
      dataIndex: "Floor",
      key: "Floor",
      align: "center",
      editable: true,
    },
    {
      title: "OFFICE",
      dataIndex: "Office",
      key: "Office",
      editable: true,
      align: "center",
    },
    {
      title: "Add Date",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center",
    },
    {
      title: "Action",
      align: "center",
      dataIndex: "operation",
      key: "operation",
      render: (_, record) => {
        const editable = isEditing(record);

        return (
          <div>
            {editable ? (
              <div style={{ display: "flex", justifyContent: "center" }}>
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
              <div style={{ display: "flex", justifyContent: "center" }}>
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

  const total = data?.meta.pagination.total;
  const PageSize = data?.meta.pagination.pageSize;

  if (isLoading) {
    return <h1>loading</h1>;
  }

  return (
    <ContextProvider>
      <div style={{ display: "flex", justifyContent: "end" }}>
        <Space>
          <AddModal title={"اضافة بيانات العهدة"} children={<AssetsForm />} />
          <div style={{ paddingBottom: "30px" }}>
            <Button
              onClick={() => refetch()}
              style={{ borderRadius: "5px", textAlign: "left" }}
              type="primary"
              size={"large"}
            >
              Refresh
            </Button>
          </div>
        </Space>
      </div>
      <div style={{ overflow: "auto" }}>
        <Search
          style={{ width: "40%" }}
          placeholder="Search By Employee Id And name"
          onSearch={(value) => {
            setSearch(value);
          }}
        />

        <DataTable
          total={total}
          rowKey={(record) => record.id}
          form={form}
          PageSize={PageSize}
          data={ApiData}
          setCurrentPage={setCurrentPage}
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          columns={mergedColumns}
        />
      </div>
    </ContextProvider>
  );
};

export default Assets;
