import React from "react";
import ReportsExport from "../components/dashboard/ReportsExport";

import RequestAssetDataForm from "../components/Forms/RequestAssetDataForm";

const Reports = () => {
  return (
    <div>
      <h2 style={{ fontSize: "30px", textAlign: "center" }}>ِAssets Report</h2>
      <RequestAssetDataForm />
      <ReportsExport />
    </div>
  );
};

export default Reports;
