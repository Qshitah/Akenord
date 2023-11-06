import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import React from "react";
import { FcGoogle } from "react-icons/fc";

export default function GoogleLogin() {
  const login = useGoogleLogin({
    onSuccess: (response) => {
      if (response.access_token) {
        // You can retrieve user information using Google's API
        fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
          headers: {
            Authorization: `Bearer ${response.access_token}`,
          },
        })
          .then((response) => response.json())
          .then(async(user) => {
            const loginData = {
              id: user.id,
              firstName: user.given_name,
              lastName: user.family_name,
              email: user.email 
              
            }
            await axios.post("http://localhost:8080/api/auth/loginG",loginData)
            .then((responseP) => {
                sessionStorage.setItem("token", responseP.data.token);
                window.location.href = "/";
            }).catch((error) =>{
                console.log(error);
            })
          })
          .catch((error) => console.log(error));
      } else {
        console.log("Google login failed. Token not found.");
      }
    },
    onError: (error) => console.log(error),
  });

  return (
    <button onClick={() => login()} style={{ cursor: "pointer" }}>
      <FcGoogle style={{ fontSize: "3rem" }} />
    </button>
  );
}
