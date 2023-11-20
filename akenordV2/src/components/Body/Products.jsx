import React, { useEffect, useState } from "react";
import TabItem from "./TabItem";
const tab_btn = ["featured", "popular", "new-added"];

export default function Products({ products, client }) {
  const currentDate = new Date();
  const threshold = 24 * 60 * 60 * 1000;

  Array.prototype.shuffle = function () {
    for (let i = this.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this[i], this[j]] = [this[j], this[i]];
    }
    return this;
  };

  const [tabActive, setTabActive] = useState("featured");

  const handleClickTab = (e) => {
    e.preventDefault();
    setTabActive(e.target.id);
  };

  return (
    <section className="products section container">
      <div className="tab__btns">
        {tab_btn.map((value, key) => (
          <span
            key={key}
            className={`tab__btn ${tabActive === value ? "active-tab" : ""}`}
            data-target={"#" + value}
            id={value}
            onClick={handleClickTab}
          >
            {value
              .replace(/-/g, " ")
              .replace(/\b\w/g, (match) => match.toUpperCase())}
          </span>
        ))}
      </div>
      <div className="tab__items">
        {tab_btn.map((value, key) => (
          <div
            className={`tab__item  ${tabActive === value ? "active-tab" : ""}`}
            content="true"
            id={value}
            key={key}
          >
            <div className="products__container grid">
              {key === 0 && products.slice().shuffle().filter(value => value.featured).slice(0,6).map((valueP,keyP )=> (
                <TabItem key={keyP} value={valueP} index={keyP} client={client} />
              ))}
              {key === 1 && products.slice().shuffle().filter(value => value.popular).slice(0,6).map((valueP,keyP) => (
                <TabItem key={keyP} value={valueP} index={keyP} client={client} />
              ))}
              {
                key === 2 && products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt) )
                .slice(0,6).map((valueP,keyP) => (
                  <TabItem key={keyP} value={valueP} index={keyP} client={client} />
                ))
              }
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
