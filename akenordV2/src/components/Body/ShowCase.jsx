import React from "react";
import ShowCaseItem from "./ShowCaseItem";

const showCase = ["Hot Releases", "Deals & Outlet", "Top Selling", "Trendy"];

export default function ShowCase({ products }) {
  Array.prototype.shuffle = function () {
    for (let i = this.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this[i], this[j]] = [this[j], this[i]];
    }
    return this;
  };
  return (
    <section className="showcase section">
      <div className="showcase__container container grid">
        {showCase.map((value, key) => (
          <div className="showcase__wrapper" key={key}>
            <h2 className="section__title">{value}</h2>
            {key === 0 && products.slice().shuffle().filter(value => value.hot).slice(0,4).map((valueP,keyP )=> (
                <ShowCaseItem key={keyP} value={valueP} index={keyP} />
              ))}
            {key === 1 && products.slice().shuffle().filter(value => value.deals).slice(0,4).map((valueP,keyP )=> (
                <ShowCaseItem key={keyP} value={valueP} index={keyP} />
              ))}
            {key === 2 && products.slice().shuffle().filter(value => value.top).slice(0,4).map((valueP,keyP )=> (
                <ShowCaseItem key={keyP} value={valueP} index={keyP} />
              ))}
            {key === 3 && products.slice().shuffle().filter(value => value.trendy).slice(0,4).map((valueP,keyP )=> (
                <ShowCaseItem key={keyP} value={valueP} index={keyP} />
              ))}
          </div>
        ))}
      </div>
    </section>
  );
}
