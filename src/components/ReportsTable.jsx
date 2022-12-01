import { Table, Button, Space } from "antd";
import React, { useRef } from "react";
import { message } from "antd";
import { CSVLink } from "react-csv";
import { useGetAssetsQuery } from "../Redux/Api/AssetsApi";
import ExportPdf from "./ExportPdf";

const ReportsTable = ({ query, setValues }) => {
  const pdfRef = useRef(null);

  const { data, isLoading } = useGetAssetsQuery(query);
  const { success } = message;

  const ApiData = data?.data.map((data) => {
    const id = data.id;
    const { attributes } = data;
    const employee = data.attributes.employee.data?.attributes;

    return { id, ...attributes, ...employee };
  });

  const columns = [
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
      editable: true,
      align: "center",
    },
    {
      title: "OS",
      dataIndex: "os",
      key: "os",
      editable: true,
      align: "center",
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
      editable: true,
      align: "center",
    },
    {
      title: "OFFICE",
      dataIndex: "Office",
      key: "Office",
      align: "center",
      editable: true,
    },

    {
      title: "Add Date",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center",
    },
  ];

  if (isLoading) {
    return <h1>loading</h1>;
  }
  const total = data?.meta.pagination.total;
  const PageSize = data?.meta.pagination.pageSize;

  const Name = ApiData[0]?.employee?.data.attributes.Name;
  const Id = ApiData[0]?.employee?.data.attributes.EmployeeId;
  return (
    <>
      <div style={{ textAlign: "center" }}>
        <Button
          onClick={() => setValues("")}
          style={{ borderRadius: "5px", width: "150px" }}
          type="primary"
          htmlType="submit"
          size={"large"}
        >
          رجوع
        </Button>
      </div>
      <Space>
        <Button
          style={{ borderRadius: "5px", width: "150px" }}
          type="outline"
          htmlType="submit"
          size={"large"}
        >
          <CSVLink
            filename={"Expense_Table.csv"}
            data={ApiData}
            className="btn btn-primary"
            onClick={() => {
              success("The file is downloading");
            }}
          >
            Export to CSV
          </CSVLink>
        </Button>
        <ExportPdf pdfRef={pdfRef} />
      </Space>
      <div style={{ textAlign: "right" }}>
        <h2>الاسم: {Name}</h2>
        <h2>الرقم الوظيفي: {Id}</h2>
      </div>
      <div ref={pdfRef}>
        <Table
          rowClassName={() => "editable-row"}
          bordered
          total={total}
          PageSize={PageSize}
          dataSource={ApiData}
          columns={columns}
        />
      </div>
    </>
  );
};

export default ReportsTable;
