import React, { useState, useEffect } from "react";
import { Button, message, Space } from "antd";
import { CSVLink } from "react-csv";
import { useGetAssetsQuery } from "../../Redux/Api/AssetsApi";
import qs from "qs";
import ExportPdf from "../ExportPdf";

const ReportsExport = () => {
  const [total, setTotal] = useState("");
  const [isPdf, setIsPdf] = useState(false);
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
    const ChangeData = () => {
      refetch();
      setTotal(getTotal);
    };
    ChangeData();
  }, [refetch, getTotal]);

  const ApiData = data?.data.map((data) => {
    const { Serial, ItemName, Building, Floor, Office, createdAt } =
      data.attributes;
    const employee = data.attributes?.employee?.data?.attributes;
    const EmployeeId = employee?.EmployeeId;
    const Name = employee?.Name;

    return {
      EmployeeId,
      Name,
      Serial,
      ItemName,
      Building,
      Floor,
      Office,
      createdAt,
    };
  });

  const handleClick = () => {
    setIsPdf(true);
    success("The file is downloading");
  };

  return (
    <div style={{ marginTop: "30px", textAlign: "center" }}>
      <h2 style={{ fontSize: "30px", textAlign: "center" }}>
        Csv طباعة العهد جميع الموظفين
      </h2>
      <Space>
        {!isLoading && (
          <Button
            style={{ borderRadius: "5px", width: "150px" }}
            onClick={handleClick}
            type="primary"
            size={"large"}
          >
            {isPdf ? (
              <CSVLink
                filename={"assets.csv"}
                data={ApiData}
                className="btn btn-primary"
              >
                Export to CSV
              </CSVLink>
            ) : (
              "Export to CSV"
            )}
          </Button>
        )}
        <div onClick={() => setIsPdf(true)}>
          <ExportPdf isPdf={isPdf} ApiData={ApiData} />
        </div>
      </Space>
    </div>
  );
};

export default ReportsExport;
