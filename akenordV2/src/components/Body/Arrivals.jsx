import React, { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import ReactLoading from 'react-loading';
import Swiper from "swiper";

export default function Arrivals({products , client}) {

  const [loading, setLoading] = useState(true);
  const [listProducts,setListProducts] = useState([]);

  useEffect(() => {
    if(products !== null){
      setListProducts(products)
      setLoading(false);
    }
  })

  useEffect(() => {
    if(!loading) {
      var swiperProducts = new Swiper('.new__container', {
        spaceBetween: 24,
        loop: false,
      
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      
        breakpoints: {
          768: {
            slidesPerView: 2,
            spaceBetween: 24,
          },
          992: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
          1400: {
            slidesPerView: 4,
            spaceBetween: 24,
          },
        },
      });
      
    }
  },[loading])
  
  if(loading){
    return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <ReactLoading type="spinningBubbles" color="hsl(176, 88%, 27%)" height={70} width={70} />
    </div>
  }

  return (
    <section className="new__arrivals container section">
      <h3 className="section__title">
        <span>New</span> Arrivals
      </h3>

      <div className="new__container swiper">
        <div className="swiper-wrapper">
            {listProducts.map((value,key) => {
                if(value.arrivals){
                    return <ProductItem value={value} key={key} index={key} client={client} />
                }
            })}
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
