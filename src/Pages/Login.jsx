import React from "react";
import LoginForms from "../components/Forms/LoginForms";
import "../styles/LoginStyles.css";

const Login = () => {
  return (
    <div className="main-wrapper">
      <div className="LoginContainer eq">
        <div className="card info col">
          <div className="logo animated">
            <img className="login-logo" alt="" src="/images/logo.png" />
          </div>

          <h1 className="title animated" style={{ color: "white" }}>
            العهد
          </h1>
          <p className="para animated">
            We have a sprawling 10 acre campus with vast open spaces. The
            existing infrastructure has been further enhanced in January 2014 by
            University.
          </p>
          <p className="copy animated">&copy; Alsharia</p>
        </div>
        <div className="card col">
          <h1 className="title animated">Login</h1>
          <div style={{ width: "70%", margin: "auto", paddingTop: "30px" }}>
            <LoginForms />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
