import { Table, Button, Space } from "antd";
import React from "react";
import { message } from "antd";
import { CSVLink } from "react-csv";
import ExportPdf from "./ExportPdf";

const ReportsTable = ({ data, isLoading, setValues, pdfRef }) => {
  const { success } = message;

  const ApiData = data?.data.map((data) => {
    const { Serial, ItemName, Building, os, Specs, Floor, Office, createdAt } =
      data.attributes;
    const employee = data.attributes.employee.data?.attributes;
    const Name = employee?.Name;
    const EmployeeId = employee?.EmployeeId;
    return {
      EmployeeId,
      Specs,
      Name,
      os,
      Serial,
      ItemName,
      Building,
      Floor,
      Office,
      createdAt,
    };
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
      title: "Add Date",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center",
    },
  ];

  if (isLoading) {
    return <h1>loading</h1>;
  }

  const Name = ApiData[0]?.Name;
  const Id = ApiData[0]?.EmployeeId;

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
      <div ref={pdfRef}>
        <div style={{ textAlign: "right" }}>
          <h2> الاسم: {Name} </h2>
          <h2>{Id} :الوظيفي الرقم</h2>
        </div>

        <Table
          rowClassName={() => "editable-row"}
          bordered
          pagination={false}
          dataSource={ApiData}
          columns={columns}
        />
      </div>
    </>
  );
};

export default ReportsTable;
