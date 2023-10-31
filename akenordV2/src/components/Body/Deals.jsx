import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const dealItems = [
  {
    brand: "Deal of the Day",
    category: "Limited quantities.",
    title: "Summer Collection New Morden Design",
    price: 139.0,
    oldPrice: 160.99,
    url: "summer-collection",
    image: "/img/deals-1.jpg",
  },
  {
    brand: "Women Clothing",
    category: "Limited quantities.",
    title: "Try something new on vacation",
    price: 139.0,
    oldPrice: 160.99,
    url: "summer-collection",
    image: "/img/deals-2.png",
  },
];

export default function Deals() {
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const countDownDate = new Date("2023-12-31 23:59:59").getTime();

  useEffect(() => {

    const updateCountDown = () => {
      const now = new Date().getTime();
      const distance = countDownDate - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeRemaining({
          days,
          hours,
          minutes,
          seconds,
        });
      }
    };

    const countdownInterval = setInterval(updateCountDown, 1000);

    return () => {
      clearInterval(countdownInterval);
    };
  });

  return (
    <section className="deals section">
      <div className="deals__container container grid">
        {dealItems.map((value, key) => (
          <div
            className="deals__item"
            key={key}
            style={{ backgroundImage: `url(${value.image})` }}
          >
            <div className="deals__group">
              <h3 className="deals__brand">{value.brand}</h3>
              <span className="deals__category">{value.category}</span>
            </div>

            <h4 className="deals__title">{value.title}</h4>

            <div className="deals__price flex">
              <span className="new__price">{value.price}Dh</span>
              <span className="old__price">{value.oldPrice}Dh</span>
            </div>

            <div className="deals__group">
              <p className="deals__countdown-text">Hurry Up! Offer End In:</p>

              <div className="countdown">
                <div className="countdown__amount">
                  <p className="countdown__period">{timeRemaining.days}</p>
                  <span className="unit">Days</span>
                </div>
                <div className="countdown__amount">
                  <p className="countdown__period">{timeRemaining.hours}</p>
                  <span className="unit">Hours</span>
                </div>
                <div className="countdown__amount">
                  <p className="countdown__period">{timeRemaining.minutes}</p>
                  <span className="unit">Mins</span>
                </div>
                <div className="countdown__amount">
                  <p className="countdown__period">{timeRemaining.seconds}</p>
                  <span className="unit">Sec</span>
                </div>
              </div>
            </div>

            <div className="deals__btn">
              <Link to={"shop?" + value.url} className="btn btn--md">
                Shop Now
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
