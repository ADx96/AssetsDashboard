import React from "react";
import LoginForms from "../components/Forms/LoginForms";
import "../styles/LoginStyles.css";
import { Col, Row } from "antd";

const Login = () => {
  return (
    <>
      <Row>
        <Col className="main-container" md={{ span: 16 }}>
          <div className="bg-card">
            <div className="form-container">
              <div className="form-title">
                <img className="logo-mobile" src="/images/logo2.png" alt="" />
                <h1 className="en-heading">Kuwait University</h1>
                <h1 className="ar-heading">جامعة الكويت</h1>
              </div>

              <LoginForms />
            </div>
            <div className="bg-img-hold">
              <img src="/images/bg.png" alt="bg-card" />
            </div>
          </div>
        </Col>
        <Col xs={{ span: 20 }} md={{ span: 8 }}>
          <div className="bg-card-right">
            <img src="/images/logo2.png" alt="" />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Login;
