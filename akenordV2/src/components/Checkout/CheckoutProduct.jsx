import axios from "axios";
import React, { useState } from "react";
import ReactLoading from "react-loading";
import { useEffect } from "react";

export default function CheckoutProduct({
  data,
  shippingPrice,
  orderData,
  setOrderData,
  calculateCartSubtotal,
}) {
  const [coupon, setCoupon] = useState({
    name: "",
    coupon: {},
  });

  const handleChange = (e) => {
    const newValue = e.target.value;
    setOrderData({
      ...orderData,
      paiment: newValue,
    });
  };

  const handleClickCoupon = async (e) => {
    e.preventDefault();
    if (coupon.name.trim() !== "") {
      try {
        const response = await axios.get(
          `https://akenord.onrender.com/api/coupons/search/findByCode?code=${coupon.name}`
        );
        setCoupon({
          ...coupon,
          coupon: {
            code: response.data.code,
            value: response.data.value,
            discountType: response.data.discountType,
          },
        });
        setOrderData({
          ...orderData,
          coupon: {
            code: response.data.code,
            value: response.data.value,
            discountType: response.data.discountType,
          },
        });
      } catch (error) {
        console.log(error);
      }
    } else {
    }
  };

  const checkObjectisNotEmpty = (object) => {
    if (object !== undefined) {
      if (Object.keys(object).length > 0) {
        return object;
      }
    }
    return "empty";
  };

  if (data === undefined) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ReactLoading
          type="spinningBubbles"
          color="hsl(176, 88%, 27%)"
          height={70}
          width={70}
        />
      </div>
    );
  }
  return (
    <div className="checkout__group">
      <h3 className="section__title">Cart Totals</h3>

      <table className="order__table">
        <thead>
          <tr>
            <th colSpan="2">Products</th>
            <th>Total</th>
          </tr>
        </thead>

        <tbody>
          {data.products.map((value) => (
            <tr key={value.idCart}>
              <td>
                <img
                  src={JSON.parse(value.images)[0]}
                  alt=""
                  className="order__img"
                />
              </td>

              <td>
                <h3 className="table__title">{value.name}</h3>
                {value.size.trim() !== "" && <p className="table__description">Size: {value.size}</p>}
                {value.color.trim() !== "" && <p className="table__description">Color: {value.color}</p>}
                <p className="table__quantity">x {data.quantity[value.idCart]}</p>
              </td>

              <td>
                <span className="table__price">
                  {(
                    (value.discountPrice !== 0
                      ? value.discountPrice
                      : value.price) * data.quantity[value.idCart]
                  ).toFixed(2)}
                  Dh
                </span>
              </td>
            </tr>
          ))}
        </tbody>

        <tfoot>
          <tr>
            <td>
              <span className="order__subtitle">SubTotal</span>
            </td>
            <td colSpan="2">
              <span className="table__price">{calculateCartSubtotal()}Dh</span>
            </td>
          </tr>
          {orderData.region !== "" && (
            <tr>
              <td>
                <span className="order__subtitle">Shipping</span>
              </td>
              <td colSpan="2">
                <span className="table__price">
                  {shippingPrice === 0 || shippingPrice === undefined
                    ? "Free Shipping"
                    : shippingPrice + "Dh"}
                </span>
              </td>
            </tr>
          )}

          {checkObjectisNotEmpty(coupon.coupon) !== "empty" && (
            <tr>
              <td>
                <span className="cart__total-title">Coupon</span>
              </td>
              <td colSpan="2">
                <span className="cart__total-price">
                  {coupon.coupon.discountType === "percentage"
                    ? coupon.coupon.value + "%"
                    : coupon.coupon.value + "Dh"}
                </span>
              </td>
            </tr>
          )}

          <tr>
            <td>
              <span className="order__subtitle">Total</span>
            </td>
            <td colSpan="2">
              <span className="order__grand-total">
                {checkObjectisNotEmpty(coupon.coupon) !== "empty"
                  ? coupon.coupon.discountType === "percentage"
                    ? (
                        calculateCartSubtotal() *
                          (1 - coupon.coupon.value / 100) +
                        shippingPrice
                      ).toFixed(2) + "Dh"
                    : (
                        calculateCartSubtotal() -
                        coupon.coupon.value +
                        shippingPrice
                      ).toFixed(2) + "Dh"
                  : (calculateCartSubtotal() + shippingPrice).toFixed(2) + "Dh"}
              </span>
            </td>
          </tr>
        </tfoot>
      </table>

      <br />

      <form className="coupon__form form grid" onSubmit={handleClickCoupon}>
        <div className="form__group grid">
          <input
            type="text"
            className="form__input"
            placeholder="Enter Your Coupon"
            value={coupon.name}
            onChange={(e) => setCoupon({ ...coupon, name: e.target.value })}
          />

          <div className="form__btn">
            <button type="submit" className="btn flex btn--sm">
              <i className="fi-rs-label"></i> Apply
            </button>
          </div>
        </div>
      </form>

      <div className="payment__methods">
        <h3 className="checkout__title payment__title">Payment</h3>

        <div className="payment__option flex">
          <input
            type="radio"
            name="radio"
            value="Direct Bank Transfer"
            checked={orderData.paiment === "Direct Bank Transfer"}
            onChange={handleChange}
            className="payment__input"
          />
          <label htmlFor="" className="payment__label">
            Direct Bank Transfer
          </label>
        </div>

        <div className="payment__option flex">
          <input
            type="radio"
            name="radio"
            className="payment__input"
            value="Cash on Delivery"
            checked={orderData.paiment === "Cash on Delivery"}
            onChange={handleChange}
          />
          <label htmlFor="" className="payment__label">
            Cash on Delivery
          </label>
        </div>
      </div>

      <button type="submit" className="btn btn--md" form="checkout-form">
        Place Order
      </button>
    </div>
  );
}
