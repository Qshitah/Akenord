import axios from "axios";
import React from "react";
import { FaFacebook } from "react-icons/fa";
import { LoginSocialFacebook } from "reactjs-social-login";
import { loginUser } from "../../actions/AuthActions";
import { useDispatch } from "react-redux";

export default function LoginF(props) {

    const dispatch = useDispatch();

  return (
    <LoginSocialFacebook
      appId="1311834196359367"
      onResolve={async(response) => {

        const loginData = {
                id: response.data.userID,
                firstName: response.data.first_name,
                lastName: response.data.last_name,
                email: response.data.email 
        }

        props.loading();
        
        await axios.post("https://akenord.ma:8443/api/auth/loginfb",loginData)
            .then((responseP) => {
                sessionStorage.setItem("token", responseP.data.token);
                window.location.href = "/";
            }).catch((error) =>{
                console.log(error);
                props.loading();

            })

      }}
      onReject={(error) => {
        console.log(error);
      }}
      
    >
        <FaFacebook  style={{ fontSize: "3rem", color:"blue" ,cursor:"pointer"}}/>
    </LoginSocialFacebook>
  );
}
