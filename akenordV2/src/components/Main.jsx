import React, { useEffect, useState } from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import '../index.css'
import { Outlet, useLocation } from "react-router-dom";
export default function Main({listWishlist, listCart}) {

  return (
    <>
      <Header listWishlist={listWishlist} listCart={listCart}/>
      <Outlet />
      <Footer />
    </>
  );
}
