import React from "react";
import { message } from "antd";
import { CSVLink } from "react-csv";
import { useGetAssetsQuery } from "../../Redux/Api/AssetsApi";
import qs from "qs";

const ReportsExport = () => {
  const { success } = message;

  const query = qs.stringify(
    {
      populate: "employee",
      pagination: {
        pageSize: 1000,
      },
    },
    {
      encodeValuesOnly: true, // prettify URL
    }
  );
  const { data, isLoading } = useGetAssetsQuery(query);

  const ApiData = data?.data.map((data) => {
    const id = data.id;
    const { attributes } = data;
    const employee = data.attributes.employee.data?.attributes;
    return { id, ...attributes, ...employee };
  });

  if (isLoading) {
    return <h1>loading</h1>;
  }

  return (
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
  );
};

export default ReportsExport;
