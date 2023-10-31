import React from "react";
import { useState } from "react";
import { useDispatch} from "react-redux";
import { userUpdated } from "../../actions/UserActions";
import validator from "validator";
import axios from "axios";

export default function UpdateProfile({user, client}) {

  const dispatch = useDispatch();

  const [updateSuccess,setUpdateSuccess] = useState(false);


    const [userInfo,setUserInfo] = useState({
        username: client.username,
        first_name: user.first_name,
        last_name: user.last_name,
        phone_number: user.phone_number,
        email: user.email,
        birth_date: user.birth_date.substring(0, 10)
    });


    const [erreur, setErreur] = useState({
      erreur:"",
      type:""
    });

    const handleChange = (e) => {
        e.preventDefault();

        setUserInfo({
            ...userInfo,
            [e.currentTarget.name]: e.currentTarget.value
        });
    };

    const handleSubmit = async(e) => {
      e.preventDefault();
  
      setErreur({
        erreur:"",
        type:""
      });
  
      if(userInfo.first_name === ""){
        return setErreur({
          erreur: "First Name is empty",
          type: "first_name"
        });
      }
  
      if(userInfo.last_name === ""){
        return setErreur({
          erreur: "Last Name is empty",
          type: "last_name"
        });
      }
  
      if(userInfo.email === ""){
        return setErreur({
          erreur: "Email is empty",
          type: "email"
        });
      }
  
      if(!validator.isEmail(userInfo.email)){
        return setErreur({
          erreur: "Email is not valid",
          type: "email"
        });
      }
  
      if(userInfo.phone_number === ""){
        return setErreur({
          erreur: "Phone Number is empty",
          type: "phone_number"
        });
      }
  
      if(!/^[0-9]+$/.test(userInfo.phone_number)){
        return setErreur({
          erreur: "Phone Number is not valid",
          type: "phone_number"
        });
      }
  
      if(userInfo.birth_date === "" ){
        return setErreur({
          erreur: "Birth Date is empty",
          type: "birth_date"
        });
      }

      await axios.put(`http://localhost:8080/api/users/${client.username}`, {...client,...userInfo})
        .then((response) => {
          console.log(response);
          dispatch(userUpdated(userInfo));
          setUpdateSuccess(true);
        }).catch((error) => {
          console.log(error);
        })
          
  
    }

    return (
    <form className="form grid" onSubmit={handleSubmit}>

      {updateSuccess && <h5 style={{color: "green"}}>You've Updated your Profile Successfully</h5>}

      <input type="text" placeholder="Username" className="form__input" name="username" value={userInfo.username} readOnly onChange={handleChange}/>

      {erreur.type ==="first_name" && <p style={{color : "red", fontSize : "12px"}}>{erreur.erreur}</p>}
      <input type="text" placeholder="First Name" className="form__input" name="first_name" value={userInfo.first_name} required onChange={handleChange}/>

      {erreur.type ==="last_name" && <p style={{color : "red", fontSize : "12px"}}>{erreur.erreur}</p>}
      <input type="text" placeholder="Last Name" className="form__input" name="last_name" value={userInfo.last_name} required onChange={handleChange} />

      {erreur.type ==="email" && <p style={{color : "red", fontSize : "12px"}}>{erreur.erreur}</p>}
      <input type="email" placeholder="Email" className="form__input" name="email" value={userInfo.email} required onChange={handleChange}/>

      {erreur.type ==="phone_number" && <p style={{color : "red", fontSize : "12px"}}>{erreur.erreur}</p>}
      <input type="tel" placeholder="Phone Number" className="form__input" name="phone_number" value={userInfo.phone_number} required onChange={handleChange}/>

      <label htmlFor="birth_date">Birthday Date:</label>
      {erreur.type ==="birth_date" && <p style={{color : "red", fontSize : "12px"}}>{erreur.erreur}</p>}
      <input type="date" placeholder="Birthday Date" value={userInfo.birth_date.split(' ')[0]} className="form__input" name="birth_date" required onChange={handleChange} />


      <div className="form__btn">
        <button type="submit" className="btn btn--md">Save</button>
      </div>
    </form>
  );
}
