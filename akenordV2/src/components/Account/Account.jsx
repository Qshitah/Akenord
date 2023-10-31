import React, { useState } from "react";
import BreadCrumb from "../Shop/BreadCrumb";
import Facture from "../Email/Facture";
import UpdateProfile from "./UpdateProfile";
import Orders from "./Orders";
import ChangePassword from "./ChangePassword";

export default function Account({ client, orders, userData }) {
  const [tab, setTab] = useState("dashboard");
  
  console.log(userData);


  const handleChangeTab = (e) => {
    setTab(e.target.getAttribute("data-target").replace("#", ""));
  };

  function logout() {
    // Remove the token from session storage
    sessionStorage.removeItem('token');
    
    // Redirect to the homepage
    window.location.href = '/';
  }


  return (
    <main className="main">
      <BreadCrumb firstP="Home" secondP="Account" />
      <section className="accounts section--lg">
        <div className="accounts__container container grid">
          <div className="account__tabs">
            <p
              className={
                "account__tab " + (tab === "dashboard" && "active-tab")
              }
              data-target="#dashboard"
              onClick={handleChangeTab}
            >
              <i className="fi fi-rs-settings-sliders"></i> Dashboard
            </p>

            <p
              className={"account__tab " + (tab === "orders" && "active-tab")}
              data-target="#orders"
              onClick={handleChangeTab}
            >
              <i className="fi fi-rs-shopping-bag"></i> Orders
            </p>

            <p
              className={
                "account__tab " + (tab === "update-profile" && "active-tab")
              }
              data-target="#update-profile"
              onClick={handleChangeTab}
            >
              <i className="fi fi-rs-user"></i> Update Profile
            </p>

            <p
              className={
                "account__tab " + (tab === "change-password" && "active-tab")
              }
              data-target="#change-password"
              onClick={handleChangeTab}
            >
              <i className="fi fi-rs-user"></i> Change Password
            </p>

            <p className="account__tab " onClick={logout}>
              <i className="fi fi-rs-exit"></i> Logout
            </p>
          </div>

          <div className="tabs__content">
            <div
              className={
                "tab__content " + (tab === "dashboard" && "active-tab")
              }
              id="dashboard"
            >
              <h3 className="tab__header">Hello {client.username}!</h3>

              <div className="tab__body">
                <p className="tab__description">
                  From your account dashboard. you can easily check & view your
                  recent orders, manage your shipping and billing addresses and
                  edit your password and account details.
                </p>
              </div>
            </div>

            <div
              className={"tab__content " + (tab === "orders" && "active-tab")}
              id="orders"
            >
              <h3 className="tab__header">Your Orders</h3>

              <div className="tab__body">
                <Orders orders={orders}/>
              </div>
            </div>

            <div
              className={
                "tab__content " + (tab === "update-profile" && "active-tab")
              }
              id="update-profile"
            >
              <h3 className="tab__header">Update Profile</h3>

              <div className="tab__body">
                <UpdateProfile user={userData} client={client}/>
              </div>
            </div>

            <div
              className={
                "tab__content " + (tab === "change-password" && "active-tab")
              }
              id="change-password"
            >
              <h3 className="tab__header">Change Password</h3>

              <div className="tab__body">
                <ChangePassword client={client}/>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
