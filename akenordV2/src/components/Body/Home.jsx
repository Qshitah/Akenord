import React from "react";
import { Link } from "react-router-dom";

export default function Home({subtitle,title,description,shop,image}) {
  return (
    <section className="home section--lg">
      <div className="home__container container grid">
        <div className="home__content">
          <span className="home__subtitle">{subtitle}</span>
          <h1 className="home__title" dangerouslySetInnerHTML={{__html: title}}>
            
          </h1>
          <p className="home__description">
            {description}
          </p>
          <Link to={"/shop?search=" + shop} className="btn">
            Shop Now
          </Link>
        </div>

        <img src={image} alt="" className="home__img" />
      </div>
    </section>
  );
}
