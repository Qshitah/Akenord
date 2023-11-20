import React from "react";
import { Link } from "react-router-dom";



export default function FooterContainer({ info }) {

  const phoneNumber = '+212654404611';
  const message = 'Hi Support Team, I need assistance with an issue. Can you please help me?'

  const whatsappLink = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

  const handleContactUs = () => {
    const email = 'support@akenord.ma';
    window.location.href = `mailto:${email}`;
  };

  const content = [
    {
      title: "Address",
      links: [
        {
          title: "About Us",
          url: "/aboutus",
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
          url: whatsappLink,
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
          url: "/login",
        },
        {
          title: "View Cart",
          url: "/cart",
        },
        {
          title: "My Wishlist",
          url: "/wishlist",
        },
        {
          title: "Order",
          url: (sessionStorage.getItem('token') ? '/myaccount' : '/login'),
        },
      ],
    },
  ];

  return (
    <div className="footer__container grid">
      <div className="footer__content">
        <Link to="/" className="footer__logo">
          <img src="/logoText.png" alt="" className="footer__logo-img" />
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
            {info.social.map((value) => (
              <a href={value.url} key={value.title} target="_blank" rel="noopener noreferrer">
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
          <h2 className="footer__title">{value.title}</h2>

          <ul className="footer__links">
            {value.links.map((link) => (
              <li key={link.title}>
                {link.title === "Contact Us" ? (
                  <a href={link.url} target="_blank" rel="noopener noreferrer" className="footer__link">
                    {link.title}
                  </a>
                ) : link.title === "Support Center" ? 
                <a onClick={handleContactUs} href="" target="_blank" rel="noopener noreferrer" className="footer__link">
                  {link.title}
                </a>
                  : <Link to={link.url}
                    className="footer__link"
                    >
                    {link.title}
                  </Link>
                }
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div className="footer__content">
        <h2 className="footer__title">Secured Payment Gateways</h2>

        <img src="/img/payment-method.png" alt="" className="payment__img" />
      </div>
    </div>
  );
}
