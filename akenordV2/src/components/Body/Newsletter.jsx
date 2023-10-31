import React from "react";

export default function Newsletter() {
  return (
    <section className="newsletter section home__newsletter">
      <div className="newsletter__container container grid">
        <h3 className="newsletter__title flex">
          <img
            src="/img/icon-email.svg"
            alt=""
            className="newsletter__icon"
          />
          Sign up to Newsletter
        </h3>

        <p className="newsletter__description">
          ...and receive $25 coupon for first shopping.
        </p>

        <form  className="newsletter__form">
          <input
            type="text"
            placeholder="Enter your email"
            className="newsletter__input"
          />
          <button type="submit" className="newsletter__btn">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
