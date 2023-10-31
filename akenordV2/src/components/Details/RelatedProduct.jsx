import React from "react";
import ProductItem from "../Body/ProductItem";

export default function RelatedProduct({ products }) {
  return (
    <section className="products container section--lg">
      <h3 className="section__title">
        <span>Related</span> Products
      </h3>

      <div className="products__container grid">
        {products.map((value, key) => (
          <ProductItem value={value} key={key} index={key} />
        ))}
      </div>
    </section>
  );
}
