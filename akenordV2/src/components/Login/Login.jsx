import React, { useState } from "react";
import BreadCrumb from "../Shop/BreadCrumb";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

export default function Login() {
  const [loading,setLoading] = useState(false);

  const handleChangeLoading = () => {
    setLoading(!loading);
  }

  return (
    <section className="main">
      <BreadCrumb firstP="Home" secondP="Login / Register" thirdP="" />
      <ClipLoader
        color={"#ffab07"}
        loading={loading}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      <section className="login-register section--lg">
        <div className="login-register__container container grid">
          <LoginForm loading={handleChangeLoading} />
          <RegisterForm loading={handleChangeLoading} />
        </div>
      </section>
    </section>
  );
}
