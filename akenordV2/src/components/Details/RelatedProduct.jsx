import React from "react";
import ProductItem from "../Body/ProductItem";

export default function RelatedProduct({ products, client }) {
  return (
    <section className="products container section--lg">
      <h2 className="section__title">
        <span>Related</span> Products
      </h2>

      <div className="products__container grid">
        {products.map((value, key) => (
          <ProductItem value={value} key={key} index={key} client={client}/>
        ))}
      </div>
    </section>
  );
}
