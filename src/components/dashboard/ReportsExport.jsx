import React, { useState } from "react";
import { Button, message, Space } from "antd";
import { CSVLink } from "react-csv";
import qs from "qs";
import ExportPdf from "../ExportPdf";

const ReportsExport = () => {
  const [entireList, setEntireList] = useState([]);

  const { success } = message;

  const query = qs.stringify(
    {
      populate: "employee",
      pagination: {
        limit: 9999,
      },
    },
    {
      encodeValuesOnly: true, // prettify URL
    }
  );

  const getEntireList = async (pageNo = 1) => {
    const response = await fetch(
      `https://ku-assets-api.herokuapp.com/api/assets?${query}`
    );
    const data = await response.json();

    const ApiData = data?.data.map((data) => {
      const id = data.id;

      const {
        Serial,
        ItemName,
        Building,
        Floor,
        Office,
        createdAt,
        status,
        isDropped,
      } = data.attributes;
      const employee = data.attributes?.employee?.data?.attributes;
      const EmployeeId = employee?.EmployeeId;
      const Name = employee?.Name;
      const WorkPlace = employee?.WorkPlace;

      return {
        id,
        EmployeeId,
        Name,
        Serial,
        ItemName,
        Building,
        Floor,
        WorkPlace,
        Office,
        createdAt,
        status,
        isDropped,
      };
    });

    setEntireList(ApiData);
  };

  const fetchData = async () => {
    await getEntireList();
  };

  const PdfHead = [
    "Employee ID",
    "Name",
    "Serial",
    "ItemName",
    "Building",
    "Floor",
    "Office",
    "WorkPlace",
    "Status",
    "Dropped",
    "createdAt",
  ];
  const PdfCol = [
    { header: "EmployeeId", dataKey: "EmployeeId" },
    { header: "Name", dataKey: "Name" },
    { header: "Serial", dataKey: "Serial" },
    { header: "ItemName", dataKey: "ItemName" },
    { header: "Building", dataKey: "Building" },
    { header: "Floor", dataKey: "Floor" },
    { header: "WorkPlace", dataKey: "WorkPlace" },
    { header: "Office", dataKey: "Office" },
    { header: "Status", dataKey: "status" },
    { header: "Dropped", dataKey: "isDropped" },
    { header: "createdAt", dataKey: "createdAt" },
  ];
  return (
    <div style={{ marginTop: "30px", textAlign: "center" }}>
      <h2 style={{ fontSize: "30px", textAlign: "center" }}>
        Csv طباعة العهد جميع الموظفين
      </h2>
      <Space>
        <Button
          style={{ borderRadius: "5px", width: "150px" }}
          onClick={async () => {
            await fetchData();
            success("The file is downloading");
          }}
          type="primary"
          size={"large"}
        >
          <CSVLink
            filename={"assets.csv"}
            data={entireList}
            className="btn btn-primary"
          >
            Export to CSV
          </CSVLink>
        </Button>

        <div
          onClick={async () => {
            await fetchData();
          }}
        >
          <ExportPdf
            head={PdfHead}
            column={PdfCol}
            isPdf={true}
            ApiData={entireList}
          />
        </div>
      </Space>
    </div>
  );
};

export default ReportsExport;
