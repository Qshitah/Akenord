import React from "react";

export default function BreadCrumb({firstP,secondP,thirdP}) {
  return (
    <section className="breadcrumb">
      <ul className="breadcrumb__list flex container">
        <li>
          <a href="index.html" className="breadcrumb__link">
            {firstP}
          </a>
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
