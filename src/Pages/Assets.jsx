import React from "react";
import DataTable from "../components/DataTable";
import AddModal from "../components/AddModal";
import AssetsForm from "../components/Forms/AssetsForm";
import {
  useDeleteAssetMutation,
  useGetAssetsQuery,
} from "../Redux/Api/AssetsApi";
import { ContextProvider } from "../Hooks/ContextProvider";
import { Button } from "antd/lib/radio";

const Assets = () => {
  const [deleteAsset] = useDeleteAssetMutation();

  const query = {
    populate: "employee",
  };

  const handleDelete = async (id) => {
    deleteAsset(id);
  };

  const { data, isLoading } = useGetAssetsQuery(query);
  const ApiData = data?.data.map((data) => {
    const id = data.id;
    const { attributes } = data;
    const employee = data.attributes.employee.data?.attributes;
    return { id, ...attributes, ...employee };
  });

  const columns = [
    {
      title: "Employee Name",
      dataIndex: "Name",
      key: "Name",
    },
    {
      title: "Employee I.D",
      dataIndex: "EmployeeId",
      key: "EmployeeId",
    },
    {
      title: "SERIAL NUMBER",
      dataIndex: "Serial",
      key: "Serial",
    },
    {
      title: "ITEM",
      dataIndex: "ItemName",
      key: "ItemName",
    },
    {
      title: "SPECIFICATION",
      dataIndex: "Specs",
      key: "Specs",
    },
    {
      title: "OS",
      dataIndex: "os",
      key: "os",
    },
    {
      title: "BUILDING",
      dataIndex: "Building",
      key: "Building",
    },
    {
      title: "FlOOR",
      dataIndex: "Floor",
      key: "Floor",
    },
    {
      title: "OFFICE",
      dataIndex: "Office",
      key: "Office",
    },
    {
      title: "Add Date",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (id) => <Button onClick={() => handleDelete(id)}>Delete</Button>,
    },
  ];

  if (isLoading) {
    return <h1>loading</h1>;
  }

  return (
    <ContextProvider>
      <AddModal title={"اضافة بيانات العهدة"} children={<AssetsForm />} />
      <div style={{ overflow: "auto" }}>
        <DataTable data={ApiData} columns={columns} />
      </div>
    </ContextProvider>
  );
};

export default Assets;
