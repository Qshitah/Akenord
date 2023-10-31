import React from "react";
import { Link } from "react-router-dom";

export default function ShowCaseItem({ value,index }) {
  return (
    <div className="showcase__item">
      <Link
        to={
          "../details?id=" +
          index +
          "&search=" +
          value.name.toLowerCase().replace(/\s+/g, "-")
        }
        className="showcase__img-box"
      >
        <img
          src={JSON.parse(value.images)[0]}
          alt=""
          className="showcase__img"
        />
      </Link>

      <div className="showcase__content">
        <Link
          to={
            "../details?id=" +
            index +
            "&search=" +
            value.name.toLowerCase().replace(/\s+/g, "-")
          }
        >
          <h4 className="showcase__title">{value.name}</h4>
        </Link>

        <div className="showcase__price flex">
          {value.discountPrice !== 0 && (
            <span className="new__price">{value.discountPrice}Dh</span>
          )}
          <span
            className={value.discountPrice !== 0 ? "old__price" : "new__price"}
          >
            {value.Price}Dh
          </span>
        </div>
      </div>
    </div>
  );
}
