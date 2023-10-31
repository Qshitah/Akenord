import React from "react";
import { Link } from "react-router-dom";

export default function HeaderTop() {
  return (
    <div className="header__top">
      <div className="header__container container">
        <div className="header__contact">
          <span>(+212) - 654404611</span>

          <span> Our location</span>
        </div>

        <p className="header__alert-news">
          Super Value Deals - Save more with coupons
        </p>
        {sessionStorage.getItem("token") ? <p>Welcome Back</p> : <Link to="/login" className="header__top-action">
          Log In / Sign Up
        </Link>}
        
      </div>
    </div>
  );
}
