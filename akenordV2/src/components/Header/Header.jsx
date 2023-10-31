import React from "react";
import HeaderTop from "./HeaderTop";
import HeaderNav from "./HeaderNav";
import { useLocation } from "react-router-dom";

export default function Header({listWishlist , listCart}) {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <header className="header">
      <HeaderTop />
      <HeaderNav path={currentPath} listWishlist={listWishlist} listCart={listCart}/>
    </header>
  );
}
