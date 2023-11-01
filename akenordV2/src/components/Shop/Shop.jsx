import React, { useEffect, useState } from "react";
import BreadCrumb from "./BreadCrumb";
import ProductItem from "../Body/ProductItem";
import { useLocation } from "react-router-dom";

export default function Shop({ listProducts, client }) {
  const [products, setProducts] = useState([]);
  const [searchParam,setSearchParam] = useState('');

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  let subcategory = queryParams.get("subcategory");
  let search = queryParams.get("search");

  function capitalizeAfterSpace(inputString) {
    // Split the string by space
    const words = inputString.split(' ');
  
    // Capitalize the first character of each word
    const capitalizedWords = words.map((word) => {
      if (word.length === 0) {
        return word; // Handle empty words (e.g., double spaces)
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    });
  
    // Join the words back together with a space
    return capitalizedWords.join(' ');
  }

  if (subcategory !== null) {
    subcategory = subcategory
      .replace(/-/g, " ");
  }

  useEffect(() => {
    if(search !== null){
      if(search !== ""){
        setSearchParam(search);
      }
    }
  },[search])

  useEffect(() => {
    if (listProducts !== null) {
      setProducts(listProducts);
    }
    if (subcategory !== null) {
      // Filter products based on subcategory
      setProducts(
        listProducts.filter((product) => product.subcategory === subcategory)
      );
    }
    if(searchParam !== null){
       setProducts(listProducts.filter(product => {
          // Convert the product name to lowercase for comparison
          const productNameLower = product.name.toLowerCase();
          
          // Check if the product name contains the query
          return productNameLower.includes(searchParam);
        }))
    }
  }, [listProducts, subcategory,searchParam]);
  return (
    <div className="main">
      <BreadCrumb firstP="Home" secondP="Shop" thirdP={subcategory !== null ? capitalizeAfterSpace(subcategory) : searchParam !== null ? capitalizeAfterSpace(searchParam) : ''} />
      <section className="products section--lg container">
        <p className="total__products">
          We found <span>{products.length}</span> items for you!
        </p>
        <div className="products__container grid">
          {products.length === 0 ? <h1>No items...</h1> : products.map((value, key) => (
            <ProductItem value={value} key={key} index={key} client={client}/>
          ))}
          
        </div>
      </section>
    </div>
  );
}
