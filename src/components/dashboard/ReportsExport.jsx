import React, { useState, useEffect } from "react";
import { Button, message, Space } from "antd";
import { CSVLink } from "react-csv";
import { useGetAssetsQuery } from "../../Redux/Api/AssetsApi";
import qs from "qs";
import ExportPdf from "../ExportPdf";

const ReportsExport = () => {
  const [total, setTotal] = useState("");
  const { success } = message;

  const query = qs.stringify(
    {
      populate: "employee",
      pagination: {
        limit: total,
      },
    },
    {
      encodeValuesOnly: true, // prettify URL
    }
  );
  const { data, isLoading, refetch } = useGetAssetsQuery(query);
  const getTotal = data?.meta.pagination.total;

  useEffect(() => {
    const ChangeData = async () => {
      await refetch();
      setTotal(getTotal);
    };
    ChangeData();
  }, [refetch, getTotal]);

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

    return {
      id,
      EmployeeId,
      Name,
      Serial,
      ItemName,
      Building,
      Floor,
      Office,
      createdAt,
      status,
      isDropped,
    };
  });
  console.log(ApiData);

  const PdfHead = [
    "Employee ID",
    "Name",
    "Serial",
    "ItemName",
    "Building",
    "Floor",
    "Office",
    "status",
    "createdAt",
    "Dropped",
  ];
  const PdfCol = [
    { header: "EmployeeId", dataKey: "EmployeeId" },
    { header: "Employee", dataKey: "Name" },
    { header: "Serial", dataKey: "Serial" },
    { header: "ItemName", dataKey: "ItemName" },
    { header: "Building", dataKey: "Building" },
    { header: "Floor", dataKey: "Floor" },
    { header: "Office", dataKey: "Office" },
    { header: "isDropped", dataKey: "isDropped" },
    { header: "createdAt", dataKey: "createdAt" },
  ];
  return (
    <div style={{ marginTop: "30px", textAlign: "center" }}>
      <h2 style={{ fontSize: "30px", textAlign: "center" }}>
        Csv طباعة العهد جميع الموظفين
      </h2>
      <Space>
        {!isLoading && (
          <Button
            style={{ borderRadius: "5px", width: "150px" }}
            onClick={() => success("The file is downloading")}
            type="primary"
            size={"large"}
          >
            <CSVLink
              filename={"assets.csv"}
              data={ApiData}
              className="btn btn-primary"
            >
              Export to CSV
            </CSVLink>
          </Button>
        )}
        <div>
          <ExportPdf
            head={PdfHead}
            column={PdfCol}
            isPdf={true}
            ApiData={ApiData}
          />
        </div>
      </Space>
    </div>
  );
};

export default ReportsExport;
