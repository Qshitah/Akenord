import React from "react";
import { useState } from "react";
import bcrypt from "bcryptjs";
import axios from "axios";

export default function ChangePassword({ client }) {
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [updateSuccess,setUpdateSuccess] = useState(false);


  const handleChange = (e) => {
    e.preventDefault();

    setPasswords({
      ...passwords,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const [erreur, setErreur] = useState({
    erreur: "",
    type: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setErreur({
      erreur: "",
      type: "",
    });

    bcrypt.compare(
      passwords.currentPassword,
      client.password,
      async (err, result) => {
        if (err) {
          // Handle the error
        } else if (result) {

            setPasswords({...passwords, currentPassword: client.password});

          // Passwords match - authentication successful
          if (passwords.newPassword === "") {
            return setErreur({
              erreur: "Password is empty",
              type: "newPassword",
            });
          }

          if (passwords.newPassword.length < 6) {
            return setErreur({
              erreur: "Password is not valid",
              type: "newPassword",
            });
          }

          if (
            passwords.confirmNewPassword === "" ||
            passwords.confirmNewPassword !== passwords.newPassword
          ) {
            return setErreur({
              erreur: "Confirm Password not equal Password",
              type: "confirmNewPassword",
            });
          }


          await axios
              .put(`https://akenord.onrender.com/api/users/${client.username}/password`, {...passwords,...client})
              .then((response) => {
                setUpdateSuccess(true);
                setPasswords({
                    username: client.username,
                    currentPassword: "",
                    newPassword: "",
                    confirmNewPassword: ""
                })
              })
              .catch((error) => {
                console.log(error);
              });

        } else {
          // Passwords do not match - authentication failed
          setErreur({
            erreur: "Current Password not equal your password, try again!",
            type: "currentPassword",
          });
        }
      }
    );
  };

  return (
    <form className="form grid" onSubmit={handleSubmit}>
        {updateSuccess && <h5 style={{color: "green"}}>You've Updated your Password Successfully</h5>}

      <input
        type="password"
        placeholder="Current Password"
        name="currentPassword"
        className="form__input"
        value={passwords.currentPassword}
        onChange={handleChange}
      />
      {erreur.type === "currentPassword" && (
        <h5 style={{ color: "red" }}>{erreur.erreur}</h5>
      )}

      <input
        type="password"
        name="newPassword"
        placeholder="New Password"
        className="form__input"
        value={passwords.newPassword}
        onChange={handleChange}
      />
      {erreur.type === "newPassword" && (
        <h5 style={{ color: "red" }}>{erreur.erreur}</h5>
      )}

      <input
        type="password"
        name="confirmNewPassword"
        placeholder="Confirm Password"
        className="form__input"
        value={passwords.confirmNewPassword}
        onChange={handleChange}
      />
      {erreur.type === "confirmNewPassword" && (
        <h5 style={{ color: "red" }}>{erreur.erreur}</h5>
      )}

      <div className="form__btn">
        <button type="submit" className="btn btn--md">
          Save
        </button>
      </div>
    </form>
  );
}
