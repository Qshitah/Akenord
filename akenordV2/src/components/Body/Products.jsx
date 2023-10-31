import React, { useEffect, useState } from "react";
import TabItem from "./TabItem";
const tab_btn = ["featured", "popular", "new-added"];

export default function Products({ products, client }) {
  const currentDate = new Date();

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
              {products.map((valueP, keyP) => {
                if (key === 0) {
                  if (valueP.featured) {
                    return <TabItem key={keyP} value={valueP} index={keyP} client={client} />;
                  }
                } else if (key === 1) {
                  if (valueP.popular) {
                    return <TabItem key={keyP} value={valueP} index={keyP} client={client} />;
                  }
                }else{
                  const date = new Date(valueP.createdAt);
                  if(date.getFullYear() === currentDate.getFullYear() && date.getMonth() === currentDate.getMonth()){
                    return <TabItem key={keyP} value={valueP} index={keyP} client={client} />;
                  }
                  
                }
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
