import DataTable from "../components/DataTable";
import { useGetAssetsQuery } from "../Redux/Api/AssetsApi";
import { ContextProvider } from "../Hooks/ContextProvider";
import { Input } from "antd";
import { EditableCell } from "../components/Forms/Editable";
import { useState, useRef } from "react";
import qs from "qs";
import AddModal from "../components/AddModal";
import SelectEmployee from "../components/Forms/SelectEmployee";
import ExportPdf from "../components/ExportPdf";

const DroppedAssets = () => {
  const pdfRef = useRef(null);
  const [search, setSearch] = useState();
  const [id, setId] = useState(null);
  const { Search } = Input;
  const [currentPage, setCurrentPage] = useState();

  const query = qs.stringify(
    {
      populate: "employee",
      filters: {
        employee: {
          EmployeeId: {
            $eq: search,
          },
        },
        isDropped: {
          $eq: true,
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

  const { data, isLoading } = useGetAssetsQuery(query);

  const ApiData = data?.data.map((data) => {
    const id = data.id;
    const employee = data.attributes.employee?.data?.attributes;
    const { attributes } = data;
    return { id, ...attributes, ...employee };
  });

  const columns = [
    {
      title: "Employee Name",
      dataIndex: "Name",
      key: "Name",
      align: "center",
    },
    {
      title: "SERIAL NUMBER",
      dataIndex: "Serial",
      key: "Serial",
      align: "center",
    },
    {
      title: "ITEM",
      dataIndex: "ItemName",
      key: "ItemName",
      align: "center",
    },
    {
      title: "SPECIFICATION",
      dataIndex: "Specs",
      key: "Specs",
      align: "center",
    },
    {
      title: "OS",
      dataIndex: "os",
      key: "os",
      align: "center",
    },
    {
      title: "BUILDING",
      dataIndex: "Building",
      key: "Building",
      align: "center",
    },
    {
      title: "FlOOR",
      dataIndex: "Floor",
      key: "Floor",
      align: "center",
    },
    {
      title: "OFFICE",
      dataIndex: "Office",
      key: "Office",
      align: "center",
    },
    {
      title: "Dropped",
      dataIndex: "isDropped",
      key: "isDropped",
      align: "center",
      render: (value) => {
        return value && "عهد ساقطة";
      },
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
        const Id = record.id;

        return (
          <div
            onClick={() => setId(Id)}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <ContextProvider>
              <AddModal title={"ارجاع"} children={<SelectEmployee id={id} />} />
            </ContextProvider>
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

  const PdfHead = [
    "Employee Name",
    "Serial",
    "ITEM",
    "SPECIFICATION",
    "OS",
    "BUILDING",
    "FLOOR",
    "OFFICE",
    "isDropped",
    "createdAt",
  ];

  const PdfCol = [
    { header: "Employee", dataKey: "Name" },
    { header: "Serial", dataKey: "Serial" },
    { header: "ITEM", dataKey: "ItemName" },
    { header: "Specification", dataKey: "Specs" },
    { header: "OS", dataKey: "os" },
    { header: "Building", dataKey: "Building" },
    { header: "Floor", dataKey: "Floor" },
    { header: "OFFICE", dataKey: "Office" },
    { header: "isDropped", dataKey: "isDropped" },
    { header: "createdAt", dataKey: "createdAt" },
  ];

  return (
    <div style={{ overflow: "auto" }}>
      <div
        style={{
          display: "flex",
          position: "relative",
          marginBottom: "10px",
          justifyContent: "space-between",
        }}
      >
        <Search
          style={{ width: "40%" }}
          placeholder="Search By Item Employee Id"
          onSearch={(value) => {
            setSearch(value);
          }}
        />
        <ExportPdf
          head={PdfHead}
          column={PdfCol}
          isPdf={true}
          ApiData={ApiData}
        />
      </div>
      <div ref={pdfRef}>
        <DataTable
          total={total}
          PageSize={PageSize}
          data={ApiData}
          setCurrentPage={setCurrentPage}
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          columns={columns}
        />
      </div>
    </div>
  );
};

export default DroppedAssets;
