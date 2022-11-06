import React from "react";
import LoginForms from "../components/Forms/LoginForms";
import "../styles/LoginStyles.css";
import { Col, Row } from "antd";

const Login = () => {
  return (
    <>
      <Row>
        <Col className="main-container" span={17}>
          <div className="bg-card">
            <div className="form-container">
              <div className="form-title">
                <h1
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    lineHeight: "7px",
                    fontFamily: "sans-serif",
                    fontSize: "40px",
                  }}
                >
                  Kuwait University
                </h1>
                <h1
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    fontFamily: "sans-serif",
                    textAlign: "right",
                    right: "30px",
                    position: "relative",
                    fontSize: "50px",
                  }}
                >
                  جامعة الكويت
                </h1>
              </div>

              <LoginForms />
            </div>
            <div className="bg-img-hold">
              <img src="/images/bg.png" alt="bg-card" />
            </div>
          </div>
        </Col>
        <Col span={6}>
          <div className="bg-card-right">
            <img src="/images/logo2.png" alt="" />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Login;
