import React from "react";
import { Link } from "react-router-dom";

export default function BreadCrumb({title,firstP, secondP}) {
  return (
    <div className="breadcrumb-wrapper d-flex align-items-center justify-content-between">
      <div>
        <h1>{title}</h1>
        <p className="breadcrumbs">
          <span>
            <Link to="/">{firstP}</Link>
          </span>
          <span>
            <i className="mdi mdi-chevron-right"></i>
          </span>
          {secondP}
        </p>
      </div>
    </div>
  );
}
