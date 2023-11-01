import React from "react";
import { Outlet } from "react-router-dom";
import './Admin.css'

export default function Admin() {

    

  return (
    <div
      id='body'
      className="ec-header-fixed ec-sidebar-fixed ec-sidebar-dark ec-header-light"
    >
      <div className="wrapper">
        <div className="ec-content-wrapper">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
