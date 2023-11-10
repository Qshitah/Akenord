import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import validator from 'validator';
import { register } from "../../actions/AuthActions";
import { jwtDecode } from "jwt-decode";
import { GoogleLogin, GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import LoginG from './LoginG';
import { LoginSocialFacebook } from "reactjs-social-login";
import LoginF from "./LoginF";


export default function RegisterForm(props) {
  const [formData,setFormData] = useState({
     username: "",

     firstName: "",

     lastName: "",

     phoneNumber: "",

     birthDate: "",

     email: "",

     password: "",

     confirmPassword : ""
  });

  const [erreur, setErreur] = useState({
    erreur:"",
    type:""
  });

  const [sucess,setSucess] = useState(false);


  const user = useSelector((state) => state.auth.register);
  const error = useSelector((state) => state.auth.error);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    setFormData({
      ...formData,
      [name] : e.target.value
    });
  }


  const handleRegister = (e) => {
    e.preventDefault();

    setErreur({
      erreur:"",
      type:""
    });


    if(formData.username === "" ){
      return setErreur({
        erreur: "Username is empty",
        type: "username"
      });
    }

    if(!/^[a-zA-Z0-9_-]{3,20}$/.test(formData.username)){
      return setErreur({
        erreur: "Username must contain only letters, numbers, underscores, and hyphens",
        type: "username"
      });
    }

    if(formData.firstName === ""){
      return setErreur({
        erreur: "First Name is empty",
        type: "firstName"
      });
    }

    if(formData.lastName === ""){
      return setErreur({
        erreur: "Last Name is empty",
        type: "lastName"
      });
    }

    if(formData.email === ""){
      return setErreur({
        erreur: "Email is empty",
        type: "email"
      });
    }

    if(!validator.isEmail(formData.email)){
      return setErreur({
        erreur: "Email is not valid",
        type: "email"
      });
    }

    if(formData.phoneNumber === ""){
      return setErreur({
        erreur: "Phone Number is empty",
        type: "phoneNumber"
      });
    }

    if(!/^[0-9]+$/.test(formData.phoneNumber)){
      return setErreur({
        erreur: "Phone Number is not valid",
        type: "phoneNumber"
      });
    }

    if(formData.password === ""){
      return setErreur({
        erreur: "Password is empty",
        type: "password"
      });
    }

    if(formData.password.length < 6){
      return setErreur({
        erreur: "Password is not valid",
        type: "password"
      });
    }
    
    if(formData.confirmPassword === "" || formData.confirmPassword !== formData.password){
      return setErreur({
        erreur: "Confirm Password not equal Password",
        type: "confirmPassword"
      });
    }

    if(formData.birthDate === "" ){
      return setErreur({
        erreur: "Birth Date is empty",
        type: "birthDate"
      });
    }

    dispatch(register(formData));

  }

    

  useEffect(()=>{
    if (error) {
      console.log(error);
    } else if (user) {
      setFormData({
        username: "",
   
        firstName: "",
   
        lastName: "",
   
        phoneNumber: "",
   
        birthDate: "",
      
        email: "",
   
        password: "",
   
        confirmPassword : ""
     })
      setSucess(true);
    }

    
  },[user,error])


  return (
    <div className="register">
      <h2 className="section__title">Create an Account</h2>
      {sucess && <p style={{color : "green"}}>Creating Account has been done Successfully, Confirm your email for verification</p>}
      {error ? (error.status !== 401 && <p style={{color : "red", fontSize : "12px"}}>{error.errors}</p>) : ""}
        
        
      <form onSubmit={handleRegister} className="form grid">

        {erreur.type ==="username" && <p style={{color : "red", fontSize : "12px"}}>{erreur.erreur}</p>}
        <input type="text" placeholder="Username" value={formData.username} className="form__input" name="username" required onChange={handleChange} />

        {erreur.type ==="firstName" && <p style={{color : "red", fontSize : "12px"}}>{erreur.erreur}</p>}
        <input type="text" placeholder="First Name" value={formData.firstName} className="form__input" name="firstName" required onChange={handleChange} />

        {erreur.type ==="lastName" && <p style={{color : "red", fontSize : "12px"}}>{erreur.erreur}</p>}
        <input type="text" placeholder="Last Name" value={formData.lastName} className="form__input" name="lastName" required onChange={handleChange}/>

        {erreur.type ==="email" && <p style={{color : "red", fontSize : "12px"}}>{erreur.erreur}</p>}
        <input type="email" placeholder="Your Email" value={formData.email} className="form__input" name="email" required onChange={handleChange} />

        {erreur.type ==="phoneNumber" && <p style={{color : "red", fontSize : "12px"}}>{erreur.erreur}</p>}
        <input type="tel" placeholder="Phone Number" value={formData.phoneNumber} className="form__input" name="phoneNumber" required onChange={handleChange} />

        {erreur.type ==="password" && <p style={{color : "red", fontSize : "12px"}}>{erreur.erreur}</p>}
        <input
          type="password"
          placeholder="Your Password"
          className="form__input"
          name="password"
          required
          onChange={handleChange}
          value={formData.password}
        />

        {erreur.type ==="confirmPassword" && <p style={{color : "red", fontSize : "12px"}}>{erreur.erreur}</p>}
        <input
          type="password"
          placeholder="Confirm Password"
          className="form__input"
          name="confirmPassword"
          required
          onChange={handleChange}
          value={formData.confirmPassword}
        />
        
        <label htmlFor="birthDate">Birthday Date:</label>
        {erreur.type ==="birthDate" && <p style={{color : "red", fontSize : "12px"}}>{erreur.erreur}</p>}
        <input type="date" placeholder="Birthday Date" value={formData.birthDate} className="form__input" name="birthDate" required onChange={handleChange} />


        <div className="form__btn">
          <button type="submit" className="btn">Submit & Register</button>
        </div>
      </form>
    </div>
  );
}
