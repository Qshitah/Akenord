import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../actions/AuthActions";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import LoginF from "./LoginF";
import LoginG from "./LoginG";
import axios from "axios";


export default function LoginForm() {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const [erreur, setErreur] = useState({
    erreur:"",
    type:""
  });

  const user = useSelector((state) => state.auth.user);
  const error = useSelector((state) => state.auth.error);

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    setLoginData({
      ...loginData,
      [name] : e.target.value
    })
  }


  const handleLogin = (e) => {
    e.preventDefault();

    setErreur({
      erreur:"",
      type:""
    });

    if(loginData.username.trim() === ""){
      return setErreur({
        erreur: "Username is empty",
        type: "username"
      });
    }

    if(loginData.password.trim() === ""){
      return setErreur({
        erreur: "Password is empty",
        type: "password"
      });
    }

    dispatch(loginUser(loginData))

  };

  useEffect(()=>{
    if (error) {
      console.log(error);
  
    } else if (user) {
      sessionStorage.setItem("token", user.token);
      window.location.href = "/";
    }
  },[user,error,navigate])

  return (
    <div className="login">
      <h3 className="section__title">Login</h3>

      {error ? (error.status === 401 && <h5 style={{color : "red", fontSize : "12px", marginBottom: "15px"}}>{error.errors}</h5>) : ""}
      <form onSubmit={handleLogin} className="form grid">
        {erreur.type ==="username" && <p style={{color : "red", fontSize : "12px"}}>Username is Empty</p>}
        <input
          type="text"
          placeholder="Your Username"
          className="form__input"
          name="username"
          value={loginData.username}
          onChange={handleChange}
        />

        {erreur.type ==="password" && <p style={{color : "red", fontSize : "12px"}}>Password is Empty</p>}
        <input
          type="password"
          name="password"
          placeholder="Your Password"
          className="form__input"
          value={loginData.password}
          onChange={handleChange}
        />

        <div className="form__btn">
          <button type="submit" className="btn">
            Login
          </button>
        </div>
      </form>
      <div className="divider" style={{marginBlock:"1.5rem"}}>
          <i className="fi fi-rs-fingerprint"></i>
        </div>
      <div style={{ textAlign: "center",display:"flex", justifyContent:"center",alignItems:"center",gap:"20px" }}>
          <GoogleOAuthProvider clientId="750916950674-ncsi9e8vt9upss747hi421vhcs38gjc5.apps.googleusercontent.com" >
            <LoginG />
          </GoogleOAuthProvider>
          <LoginF/>
        </div>

        
    </div>
  );
}
