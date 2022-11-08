import React from "react";
import { Col, Row } from "antd";
import "../../styles/StatsStyles.css";
import { UserOutlined, TagsOutlined } from "@ant-design/icons";
import { useGetAssetsQuery } from "../../Redux/Api/AssetsApi";
import { useGetEmployeesQuery } from "../../Redux/Api/EmployeesApi";

export const StatsCard = () => {
  const { data: assets } = useGetAssetsQuery();
  const { data: employees } = useGetEmployeesQuery();

  return (
    <>
      <Row gutter={18}>
        <Col span={12}>
          <div className="card">
            <div className="container">
              <TagsOutlined style={{ fontSize: "30px" }} />
              <h3>
                <b>Total Assets</b>
              </h3>
              <p style={{ fontSize: "20px" }}>
                {assets?.meta.pagination.total}
              </p>
            </div>
          </div>
        </Col>
        <Col span={12}>
          <div className="card">
            <div className="container">
              <UserOutlined style={{ fontSize: "30px" }} />

              <h3>
                <b>Total Employees</b>
              </h3>
              <p style={{ fontSize: "20px" }}>
                {employees?.meta.pagination.total}
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};
