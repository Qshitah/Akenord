import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Swiper from "swiper";
import ReactLoading from 'react-loading'

export default function Categories(props) {
  const [loading, setLoading] = useState(true);
  const [categories,setCategories] = useState([]);


  useEffect(() => {
    if(props.subcategories !== undefined){
      setCategories(props.subcategories);
      setLoading(false)
    }

  })

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
      <h2 className="section__name" >
        Popular Categories
      </h2>
      <br />
      <div className="categories__container swiper">
        <div className="swiper-wrapper">
          {categories.filter(value => value.image !== null).map((value) => (
            <Link
              to={"/shop?subcategory=" + value.name.toLowerCase().replace(/\s+/g, "-")}
              className="category__item swiper-slide"
              key={value.name.toLowerCase()}
            >
              <img src={"/subcategory/" + value.image} alt="" className="category__img" />

              <h3 className="category__title">{value.name}</h3>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
