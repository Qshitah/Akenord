import React from "react";
import { Link } from "react-router-dom";

const content = [
  {
    title: "Address",
    links: [
      {
        title: "About Us",
        url: "",
      },
      {
        title: "Delivery Information",
        url: "",
      },
      {
        title: "Privacy Policy",
        url: "",
      },
      {
        title: "Terms & Conditions",
        url: "",
      },
      {
        title: "Contact Us",
        url: "",
      },
      {
        title: "Support Center",
        url: "",
      },
    ],
  },
  {
    title: "My Account",
    links: [
      {
        title: "Sign In",
        url: "",
      },
      {
        title: "View Cart",
        url: "",
      },
      {
        title: "My Wishlist",
        url: "",
      },
      {
        title: "Track My Order",
        url: "",
      },
      {
        title: "Help",
        url: "",
      },
      {
        title: "Order",
        url: "",
      },
    ],
  },
];

export default function FooterContainer({ info }) {
  return (
    <div className="footer__container grid">
      <div className="footer__content">
        <Link to="/" className="footer__logo">
          <img src="/img/logo.svg" alt="" className="footer__logo-img" />
        </Link>

        <h4 className="footer__subtitle">Contact</h4>

        <p className="footer__description">
          <span>Address:</span> {info.address}
        </p>

        <p className="footer__description">
          <span>Phone:</span> {info.phone}
        </p>

        <p className="footer__description">
          <span>Hours:</span> {info.hours}
        </p>

        <div className="footer__social">
          <h4 className="footer__subtitle">Follow Me</h4>

          <div className="footer__social-links flex">
            <a href="">
              <img
                src="/img/icon-facebook.svg"
                alt=""
                className="footer__social-icon"
              />
            </a>

            {info.social.map((value) => (
              <a href={value.url} key={value.title}>
                <img
                  src={`/img/icon-${value.title}.svg`}
                  alt=""
                  className="footer__social-icon"
                />
              </a>
            ))}
          </div>
        </div>
      </div>

      {content.map((value) => (
        <div className="footer__content" key={value.title}>
          <h3 className="footer__title">{value.title}</h3>

          <ul className="footer__links">
            {value.links.map((link) => (
              <li key={link.title}>
                <Link to={link.url} className="footer__link">
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div className="footer__content">
        <h3 className="footer__title">Secured Payment Gateways</h3>

        <img src="/img/payment-method.png" alt="" className="payment__img" />
      </div>
    </div>
  );
}
