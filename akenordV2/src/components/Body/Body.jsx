import React, { useEffect, useState } from "react";
import Home from "./Home";
import Categories from "./Categories";
import Products from "./Products";
import Deals from "./Deals";
import Arrivals from "./Arrivals";
import ShowCase from "./ShowCase";
import Newsletter from "./Newsletter";
import { useDispatch, useSelector } from "react-redux";
import { products } from "../../actions/ProductActions";

export default function Body({listProducts, client, subcategories}) {

  console.log(listProducts);

  return (
    <main className="main">
      <Home
        subtitle="Hot promotions"
        title= "Fashion Trending <span>Great Collection</span>"
        description="Save more with coupons & up to 20% off"
        shop="poncho"
        image="/home_img.png"
      />
      <Categories subcategories={subcategories}/>
      <Products products={listProducts} client={client}/>
      <Deals />
      <Arrivals products={listProducts} client={client}/>
      <ShowCase products={listProducts} />
      {client.username.trim() === "" && <Newsletter />}
    </main>
  );
}
