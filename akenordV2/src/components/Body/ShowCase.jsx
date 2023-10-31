import React from "react";
import ShowCaseItem from "./ShowCaseItem";

const showCase = ["Hot Releases", "Deals & Outlet", "Top Selling", "Trendy"];

export default function ShowCase({ products }) {
  return (
    <section className="showcase section">
      <div className="showcase__container container grid">
        {showCase.map((value, key) => (
          <div className="showcase__wrapper" key={key}>
            <h3 className="section__title">{value}</h3>
            {products.map((valueP, keyP) => {
              if (key === 0) {
                if (valueP.hot) {
                  return <ShowCaseItem key={keyP} value={valueP} index={keyP} />;
                }
              } else if (key === 1) {
                if (valueP.deals) {
                  return <ShowCaseItem key={keyP} value={valueP} index={keyP} />;
                }
              } else if (key === 2) {
                if (valueP.top) {
                  return <ShowCaseItem key={keyP} value={valueP} index={keyP} />;
                }
              } else{
                if (valueP.trendy) {
                    return <ShowCaseItem key={keyP} value={valueP} index={keyP} />;
                }
              }
            })}
          </div>
        ))}
      </div>
    </section>
  );
}
