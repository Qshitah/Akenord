import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const nav = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Shop",
    href: "/shop",
  },
  {
    title: "My Account",
    href: "/myaccount",
  },
  {
    title: "Login",
    href: "/login",
  },
];

export default function HeaderNav({path,listWishlist, listCart}) {

  const [search,setSearch] = useState('');

  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);


  const [navMenu,setNavMenu] = useState('nav__menu');

  const handleClickToggle = (e) => {
    e.preventDefault();
    setNavMenu('nav__menu show-menu' );

  }

  const handleClickClose = (e) => {
    e.preventDefault();
    setNavMenu('nav__menu' );

  }

  const handleChange = (e) =>{
    e.preventDefault();

  
    setSearch(e.target.value);
  }

  useEffect(() => {
    setWishlist(listWishlist);
    setCart(listCart)
  },[listWishlist,listCart])


  return (
    <div className="nav container">
      <Link to="/" className="nav__logo">
        <img src="/logoText.png" alt="" className="nav__logo-img" />
      </Link>
      <div className={navMenu} id="nav-menu">
        <div className="nav__menu-top">
          <Link href="index.html" className="nav__menu-logo">
            <img src="/img/logo.svg" alt="" />
          </Link>

          <div className="nav__close" id="nav-close" onClick={handleClickClose}>
            <i className="fi fi-rs-cross-small"></i>
          </div>
        </div>

        <ul className="nav__list">
          {nav.map((value, key) => (
            key === 3 && sessionStorage.getItem("token")  ?  "" : <li className="nav__item" key={key}>
            <Link
              to={value.href}
              className={`nav__link ${path === value.href ? "active-link" : ""}`}
            >
              {value.title}
            </Link>
          </li>
            
          ))}
        </ul>

        <div className="header__search">
          <input
            type="text"
            onChange={handleChange}
            value={search}
            placeholder="Search for items..."
            className="form__input"
            required
          />

          <Link className="search__btn" to={"/shop?search=" + search}>
            <img src="/img/search.png" alt="" />
          </Link>
        </div>
      </div>

      <div className="header__user-actions">
        <Link to="/wishlist" className="header__action-btn">
          <img src="/img/icon-heart.svg" alt="" />
          <span className="count">{wishlist.length}</span>
        </Link>

        <Link to="/cart" className="header__action-btn">
          <img src="/img/icon-cart.svg" alt="" />
          <span className="count">{cart.length}</span>
        </Link>

        <div className="header__action-btn nav__toggle" id="nav-toggle" onClick={handleClickToggle}>
          <img src="/img/menu-burger.svg" alt="" />
        </div>
      </div>
    </div>
  );
}
