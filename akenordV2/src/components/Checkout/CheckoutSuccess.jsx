import React, { useEffect, useState } from "react";
import styles from "./CheckoutSuccess.module.css";
import { Link, useLocation } from "react-router-dom";
import ReactLoading from "react-loading";

export default function CheckoutSuccess() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { orderData } = location.state || null;
  console.log(orderData);

  useEffect(() => {
    if (orderData === null || typeof orderData === "undefined") {
      window.location.href = "/";
    } else {
      setLoading(false);
    }
  }, [orderData]);

  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ReactLoading type="bubbles" color="#ffab07" height={150} width={150} />
      </div>
    );
  }

  return (
    <div className="container bg-white">
      <section className="order-status section-content text-center">
        <h1 id="order-status" className="pb-5">
          Your order is on its way.
        </h1>
      </section>
      <section
        className={
          styles.customer_info +
          " " +
          styles.section_content +
          " " +
          "grid-container"
        }
      >
        <div className="row first-row text-center">
          <div className="col-sm " style={{marginTop:"10px"}}>
            <h5>Order Summary:</h5>
            <p>
              <strong>Order Date:</strong> {orderData.currentDate.toString()}
              <br />
              <strong>Provider:</strong> Cash on Delivery
              <br />
              <strong>{orderData.email}</strong>
            </p>
          </div>
          <div className="col-sm" style={{marginTop:"10px"}}>
            <h5>Shipping Address:</h5>
            <p>
              {orderData.firstName} {orderData.lastName}
              <br />
              {orderData.address}
              <br />
              {orderData.region}
              <br />
              {orderData.city}
            </p>
          </div>
        </div>
      </section>

      <section className="items section-content" style={{margin:"20px"}}>
        {orderData.products.map((value, index) => (
          <div className="row first-row pb-5 border-bottom" style={{marginBottom:"10px"}} key={index}>
            <div className="col-sm product">
              <img
                src={value[0]}
                alt="product image"
                className={styles.product_img}
              />
            </div>
            <div className="col-sm name-desc" style={{margin:"15px"}}>
              <p className={styles.product_name}>{value[1]}</p>
              <p>
                {value[5]}
                <br />
                {value[4]}
                <br />
                Qty: {value[2]}
              </p>
            </div>
            <div className="col-sm price text-right">
              <p>{(value[3] * value[2]).toFixed(2)}Dh</p>
            </div>
          </div>
        ))}
      </section>
      <section className={styles.total_amount + " " + styles.section_content}>
        <div className="row">
          <div className="col-8 text-right">
            <p>Subtotal:</p>
            <p>Estimated Shipping:</p>
            <p className="text-primary">
              <strong>Buying with Coupon:</strong>
            </p>
            <p>
              <strong>Order Total:</strong>
            </p>
          </div>
          <div className="col-4 text-right">
            <p id="cost-subtotal">{orderData.orderTotal}Dh</p>
            <p id="cost-shipping">{orderData.shippingPrice == 0 ? "Free Shipping":orderData.shippingPrice + " Dh"}</p>
            <p id="cost-discount" className="text-primary">
              <strong>{orderData.coupon !== "" ? orderData.coupon.value + (orderData.coupon.discountType == "percentage" ? "%": "Dh") : "None"}</strong>
            </p>
            <p id="cost-total" className="pb-3">
              <strong>{orderData.total}Dh</strong>
            </p>
            <Link id="track-btn" className="btn " to="/" role="button">
              Return Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
