import React from "react";
import { StatsCard } from "../components/dashboard/StatsCard";
import LatestAssets from "../components/dashboard/LatestAssets";
const Dashboard = () => {
  return (
    <>
      <StatsCard />
      <div style={{ overflow: "auto" }}>
        <h1
          style={{
            fontSize: "30px",
            textAlign: "center",
            marginTop: "50px",
          }}
        >
          Latest 5 Assets
        </h1>
        <LatestAssets />
      </div>
    </>
  );
};

export default Dashboard;
