import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Swiper from "swiper";
import ReactLoading from 'react-loading'

export default function Categories() {
  const [loading, setLoading] = useState(true);
  const [categories,setCategories] = useState([]);

  useEffect(() => {

    const fetchFeaturedProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/subCategories"
        );
        setCategories(response.data._embedded.subCategories);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }

    fetchFeaturedProducts();

    
  }, []);

  useEffect(() => {
    if (!loading) {
        const swiper = new Swiper(".categories__container", {
        spaceBetween: 24,
        loop: false,
  
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
  
        breakpoints: {
          350: {
            slidesPerView: 2,
            spaceBetween: 24,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
          992: {
            slidesPerView: 4,
            spaceBetween: 24,
          },
          1200: {
            slidesPerView: 5,
            spaceBetween: 24,
          },
          1400: {
            slidesPerView: 6,
            spaceBetween: 24,
          },
        },
      });
    }
  }, [loading]);
  
  if (loading) {
    return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <ReactLoading type="spinningBubbles" color="hsl(176, 88%, 27%)" height={70} width={70} />
</div>
  }


  return (
    <section className="categories container section">
      <h3 className="section__name">
        <span>Popular</span> Categories
      </h3>
      <br />
      <div className="categories__container swiper">
        <div className="swiper-wrapper">
          {categories.map((value) => (
            <Link
              to={"/shop?subcategory=" + value.name.toLowerCase().replace(/\s+/g, "-")}
              className="category__item swiper-slide"
              key={value.name.toLowerCase()}
            >
              <img src={value.image} alt="" className="category__img" />

              <h3 className="category__name">{value.name}</h3>
            </Link>
          ))}
        </div>

        <div className="swiper-button-next">
          <i className="fi fi-rs-angle-right"></i>
        </div>
        <div className="swiper-button-prev">
          <i className="fi fi-rs-angle-left"></i>
        </div>
      </div>
    </section>
  );
}
