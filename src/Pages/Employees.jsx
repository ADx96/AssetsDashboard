import AddModal from "../components/AddModal";
import DataTable from "../components/DataTable";
import EmployeeForm from "../components/Forms/EmployeeForm";
import { ContextProvider } from "../Hooks/ContextProvider";
import { useGetEmployeesQuery } from "../Redux/Api/EmployeesApi";

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
    dataIndex: "",
    key: "x",
    render: () => <a>Delete</a>,
  },
];

const Employees = () => {
  const { data, error, isLoading } = useGetEmployeesQuery();
  const ApiData = data?.data.map((data) => {
    return data.attributes;
  });
  if (isLoading) {
    return <h1>loading</h1>;
  }
  return (
    <ContextProvider>
      <AddModal title={"اضافة موظف "} children={<EmployeeForm />} />
      <DataTable columns={columns} data={ApiData} />
    </ContextProvider>
  );
};

export default Employees;
