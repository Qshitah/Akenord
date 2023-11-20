import React from "react";
import regions from "../../json/regions.json";
import villesJson from "../../json/villes.json";
import { useEffect } from "react";
import validator from 'validator';
import { useDispatch } from "react-redux";
import axios from "axios";
import Email from "../Email/Email";
import { removeAll } from "../../actions/CartActions";
import { useNavigate } from "react-router-dom";

export default function CheckoutForm({ client, villes, shipping, handleRegionsChange, orderData, handleChange, addRegion, erreur ,setErreur }) {
  
  const regionsJson = regions;
  const dispatch = useDispatch();
  const navigate = useNavigate();



  useEffect(() => {
    // Update shipping region with the selected region name
    if (shipping.region) {
      const selectedRegion = regionsJson.find(
        (value) => value.id == shipping.region.id
      );
      addRegion("region",selectedRegion.region)
    }
  }, [shipping.region, regionsJson]);

  useEffect(() => {
    // Update shipping region with the selected region name
    if (shipping.city) {
      const selectedCity = villesJson.find(
        (value) => value.id == shipping.city.id
      );
      addRegion("city",selectedCity.ville)
    }
  }, [shipping.city, villesJson]);

  const handleCheckoutClick = async(e) => {
    e.preventDefault();
    setErreur({
      erreur: "",
      type: "",
    });

    if (orderData.firstName.trim() === "") {
      return setErreur({
        erreur: "First Name is empty",
        type: "firstName",
      });
    }

    if (orderData.lastName.trim() === "") {
      return setErreur({
        erreur: "Last Name is empty",
        type: "lastName",
      });
    }

    if (orderData.address.trim() === "") {
      return setErreur({
        erreur: "Address is empty",
        type: "address",
      });
    }

    if (orderData.region.trim() === "") {
      return setErreur({
        erreur: "Region is empty",
        type: "region",
      });
    }

    if (orderData.city.trim() === "") {
      return setErreur({
        erreur: "City is empty",
        type: "city",
      });
    }

    if (orderData.email === "") {
      return setErreur({
        erreur: "Email is empty",
        type: "email",
      });
    }

    if (!validator.isEmail(orderData.email)) {
      return setErreur({
        erreur: "Email is not valid",
        type: "email",
      });
    }

    if (orderData.phoneNumber.trim() === "") {
      return setErreur({
        erreur: "Phone Number is empty",
        type: "phoneNumber",
      });
    }

    if (!/^[0-9]+$/.test(orderData.phoneNumber)) {
      return setErreur({
        erreur: "Phone Number is not valid",
        type: "phoneNumber",
      });
    }

    if (orderData.postalCode.trim() === "") {
      return setErreur({
        erreur: "Postal Code is empty",
        type: "postalCode",
      });
    }

    if (!/^[0-9]+$/.test(orderData.postalCode)) {
      return setErreur({
        erreur: "Postal Code is not valid",
        type: "postalCode",
      });
    }

    if(erreur.erreur.trim() === ""){
      

      await axios.post("https://akenord.ma:8443/api/orders", orderData)
      .then((response) => {
        Email(orderData).then((response2) =>{
          const byteArray = new Uint8Array(response2);
          axios.post("https://akenord.ma:8443/send-email", {emailContent: Array.from(byteArray) ,clientEmail: orderData.email}) // Send only the email content
          .then((response3) => {
           
                    })
          .catch((error) => {
            console.error("Failed to send email: ", error);
            // Handle errors or show error messages
          });
        })
        dispatch(removeAll());
        navigate('/checkoutsuccess', { state: { orderData: orderData } });
        return;
        
      })
      .catch((error) => {
        console.error("Failed to send Order: ", error);
        // Handle errors or show error messages
      });
    }
  };

  return (
    <div className="checkout__group">
      <h2 className="section__title">Billing Details</h2>

      <form className="form grid" onSubmit={handleCheckoutClick} id="checkout-form">
        {erreur.type === "firstName" && (
          <p style={{ color: "red", fontSize: "12px" }}>{erreur.erreur}</p>
        )}
        <input
          type="text"
          placeholder="First Name"
          name="firstName"
          className="form__input"
          onChange={handleChange}
          value={orderData.firstName}
        />

        {erreur.type === "lastName" && (
          <p style={{ color: "red", fontSize: "12px" }}>{erreur.erreur}</p>
        )}
        <input
          type="text"
          placeholder="Last Name"
          name="lastName"
          className="form__input"
          onChange={handleChange}
          value={orderData.lastName}

        />

        {erreur.type === "address" && (
          <p style={{ color: "red", fontSize: "12px" }}>{erreur.erreur}</p>
        )}
        <input
          type="text"
          placeholder="Address"
          name="address"
          className="form__input"
          onChange={handleChange}
          value={orderData.address}

        />

        {erreur.type === "region" && (
          <p style={{ color: "red", fontSize: "12px" }}>{erreur.erreur}</p>
        )}
        <select
          name="region"
          id="region"
          className="form__input"
          value={shipping.region.id}
          onChange={handleRegionsChange}
        >
          <option value="empty" disabled>
            Select a Region
          </option>
          {regionsJson.map((value) => (
            <option key={value.id} value={value.id}>
              {value.region}
            </option>
          ))}
        </select>

        {erreur.type === "city" && (
          <p style={{ color: "red", fontSize: "12px" }}>{erreur.erreur}</p>
        )}
        <select
          name="city"
          id="city"
          className="form__input"
          value={shipping.city.id}
          onChange={handleRegionsChange}
        >
          <option value="empty" disabled>
            Select a City
          </option>
          {villes.map((value) => (
            <option key={value.id} value={value.id}>
              {value.ville}
            </option>
          ))}
        </select>

        {erreur.type === "postalCode" && (
          <p style={{ color: "red", fontSize: "12px" }}>{erreur.erreur}</p>
        )}
        <input
          type="text"
          placeholder="Postal Code"
          name="postalCode"
          className="form__input"
          onChange={handleChange}
          value={orderData.postalCode}

        />

        {erreur.type === "phoneNumber" && (
          <p style={{ color: "red", fontSize: "12px" }}>{erreur.erreur}</p>
        )}
        <input
          type="text"
          placeholder="Phone"
          name="phoneNumber"
          className="form__input"
          onChange={handleChange}
          value={orderData.phoneNumber}
        />

        {erreur.type === "email" && (
          <p style={{ color: "red", fontSize: "12px" }}>{erreur.erreur}</p>
        )}
        <input
          type="email"
          placeholder="Email"
          name="email"
          className="form__input"
          onChange={handleChange}
          value={orderData.email}

        />

        <h2 className="checkout__title">Additional Information</h2>

        <textarea
          name="orderNote"
          placeholder="Order note"
          id="orderNote"
          cols="30"
          rows="10"
          onChange={handleChange}
          className="form__input textarea"
          value={orderData.orderNote}

        ></textarea>
      </form>
    </div>
  );
}
