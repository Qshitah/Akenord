import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import React from "react";
import { FcGoogle } from "react-icons/fc";

export default function GoogleLogin(props) {
  const login = useGoogleLogin({
    onSuccess: (response) => {
      props.loading();
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
            await axios.post("https://akenord.ma:8443/api/auth/loginG",loginData)
            .then((responseP) => {
                sessionStorage.setItem("token", responseP.data.token);
                window.location.href = "/";
            }).catch((error) =>{
                console.log(error);
                props.loading();

            })
          })
          .catch((error) => {console.log(error);props.loading();
          });
      } else {
        console.log("Google login failed. Token not found.");
      }
    },
    onError: (error) => {console.log(error);props.loading();},
    
  });

  return (
    <button onClick={() => login()} style={{ cursor: "pointer" }}>
      <FcGoogle style={{ fontSize: "3rem" }} />
    </button>
  );
}
