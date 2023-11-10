import React from "react";
import { Link } from "react-router-dom";

export default function BreadCrumb({firstP,secondP,thirdP}) {
  return (
    <section className="breadcrumb">
      <ul className="breadcrumb__list flex container">
        <li>
          <Link to="/" className="breadcrumb__link">
            {firstP}
          </Link>
        </li>
        <li>
          <span className="breadcrumb__link">{">"}</span>
        </li>
        <li>
          <span className="breadcrumb__link">{secondP}</span>
        </li>
        {thirdP !== '' && <>
        <li>
          <span className="breadcrumb__link">{">"}</span>
        </li>
        <li>
          <span className="breadcrumb__link">{thirdP}</span>
        </li>
        </> }
        
      </ul>
    </section>
  );
}
