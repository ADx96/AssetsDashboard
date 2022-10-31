import { Button } from "antd";
import AddModal from "../components/AddModal";
import DataTable from "../components/DataTable";
import EmployeeForm from "../components/Forms/EmployeeForm";
import { ContextProvider } from "../Hooks/ContextProvider";
import {
  useDeleteEmployeeMutation,
  useGetEmployeesQuery,
} from "../Redux/Api/EmployeesApi";

const Employees = () => {
  const [deleteAsset] = useDeleteEmployeeMutation();

  const { data, isLoading } = useGetEmployeesQuery();
  const ApiData = data?.data.map((data) => {
    const id = data.id;
    return { id, ...data.attributes };
  });

  const handleDelete = async (id) => {
    deleteAsset(id);
  };

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
      <AddModal title={"اضافة موظف "} children={<EmployeeForm />} />
      <div style={{ overflow: "auto" }}>
        <DataTable columns={columns} data={ApiData} />
      </div>
    </ContextProvider>
  );
};

export default Employees;
