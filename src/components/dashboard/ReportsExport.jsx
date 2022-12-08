import React, { useState, Modal } from "react";
import { Button, message, Space } from "antd";
import { CSVLink } from "react-csv";
import { useGetAssetsQuery } from "../../Redux/Api/AssetsApi";
import qs from "qs";
import SelectEmployee from "../Forms/SelectEmployee";

const ReportsExport = () => {
  const [total, setTotal] = useState("");
  const [open, setOpen] = "";
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

  const OnClick = () => {
    refetch();
    success("The file is downloading");
    const getTotal = data?.meta.pagination.total;
    setTotal(getTotal);
  };

  const handleOk = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <div style={{ marginTop: "30px", textAlign: "center" }}>
      <h2 style={{ fontSize: "30px", textAlign: "center" }}>
        Csv طباعة العهد جميع الموظفين
      </h2>
      <Modal
        title={"ارجاع العهدة"}
        open={open}
        footer={false}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <SelectEmployee />
      </Modal>
      <Space>
        {!isLoading && (
          <Button
            style={{ borderRadius: "5px", width: "150px" }}
            type="primary"
            onClick={OnClick}
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
      </Space>
    </div>
  );
};

export default ReportsExport;
