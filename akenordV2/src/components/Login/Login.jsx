import React, { useState } from "react";
import BreadCrumb from "../Shop/BreadCrumb";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Login() {

  return (
    <section className="main">
      <BreadCrumb firstP="Home" secondP="Login / Register" thirdP="" />
      <section className="login-register section--lg">
        <div className="login-register__container container grid">
          <LoginForm />
          <RegisterForm />
        </div>
      </section>
    </section>
  );
}
