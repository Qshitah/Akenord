import React, { useEffect, useState } from "react";
import BreadCrumb from "../Shop/BreadCrumb";
import { useLocation } from "react-router-dom";
import DetailProduct from "./DetailProduct";
import ReviewProduct from "./ReviewProduct";
import RelatedProduct from "./RelatedProduct";

export default function Details({ listProducts , client}) {
  const [formData, setFormData] = useState({});
  const [searchParam, setSearchParam] = useState({
    productId: "",
    productName: "",
  });

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  let productId = queryParams.get("id");
  let productName = queryParams.get("search");

  if (productName !== null) {
    productName = productName.replace(/-/g, " ");
  }

  useEffect(() => {
    if (productId !== null && productName !== null) {
      if (productId !== "" && productName !== "") {
        setSearchParam({ productId, productName });
      }
    }
  }, [productId, productName]);

  useEffect(() => {
    if (searchParam !== null) {
      setFormData(
        listProducts.find(
          (value, key) => value.name.toLowerCase() === searchParam.productName
        )
      );
    }
  }, [searchParam, listProducts]);

  const capitalizeAfterSpace = (inputString) => {
    // Split the string by space
    const words = inputString.split(" ");

    // Capitalize the first character of each word
    const capitalizedWords = words.map((word) => {
      if (word.length === 0) {
        return word; // Handle empty words (e.g., double spaces)
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    });

    // Join the words back together with a space
    return capitalizedWords.join(" ");
  };

  const checkObjectisNotEmpty = (object) => {
    if (object !== undefined) {
      if (Object.keys(object).length > 0) {
        return object;
      }
    }
    return "empty";
  };

  return (
    <div className="main">
      <BreadCrumb
        firstP="Home"
        secondP={
          checkObjectisNotEmpty(formData) !== "empty"
            ? capitalizeAfterSpace(formData.subcategory)
            : ""
        }
        thirdP={
          checkObjectisNotEmpty(formData) !== "empty"
            ? capitalizeAfterSpace(formData.name)
            : ""
        }
      />

      {checkObjectisNotEmpty(formData) !== "empty" && (
        <DetailProduct product={formData} client={client} />
      )}
      {checkObjectisNotEmpty(formData) !== "empty" && (
        <ReviewProduct
          review={formData._links.reviews}
          product_name={capitalizeAfterSpace(formData.name)}
        />
      )}
      {checkObjectisNotEmpty(formData) !== "empty" && (
        <RelatedProduct
          products={listProducts.filter(
            (value, key) => value.subcategory === formData.subcategory
          )}
        />
      )}
    </div>
  );
}
