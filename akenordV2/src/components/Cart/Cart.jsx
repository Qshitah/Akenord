import React from "react";
import BreadCrumb from "../Shop/BreadCrumb";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { removeFromCart } from "../../actions/CartActions";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import regions from "../../json/regions.json";
import villesJson from "../../json/villes.json";

export default function Cart({ listProducts, listCart, client }) {
  const [products, setProducts] = useState();
  const [quantity, setQuantity] = useState({});
  const [shipping, setShipping] = useState({
    regions: "empty",
    villes: "empty",
    price: 0,
  });
  const [coupon, setCoupon] = useState({
    name: "",
    coupon: {},
  });
  const [villes, setVilles] = useState([]);
  const regionsJson = regions;

  useEffect(() => {
    setVilles(villesJson.filter((value) => shipping.regions === value.region));
  }, [shipping.regions]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const filteredProducts = [];

    listCart.forEach((cartItem) => {
      const matchingProducts = listProducts.filter(
        (product) => product.name === cartItem.name
      );
      filteredProducts.push(...matchingProducts);
    });
    setProducts(filteredProducts.map((value,index) => ({...value,color: listCart[index].color, size: listCart[index].size,idCart:parseInt(listCart[index].id)})));

    const initialQuantity = {};
    listCart.forEach((product, index) => {
      initialQuantity[product.id] = product.quantity; // Set the initial quantity to 1
    });
    setQuantity(initialQuantity);
  }, [listProducts, listCart]);

  const handleQuantityChange = (e) => {
    let newQuantity = parseInt(e.currentTarget.value);

    const stock = products.filter((value) => value.idCart == e.currentTarget.name)[0].stock;
    if(newQuantity >= stock){
      newQuantity = stock;
    }

    // Check if the new quantity is 0 or less and set it to 1 if it is
    if (newQuantity <= 0) {
      newQuantity = 1;
    }

    if (isNaN(newQuantity)) {
      newQuantity = 1;
    }

    if (newQuantity >= 5) {
      newQuantity = 5;
    }

    setQuantity({
      ...quantity,
      [e.target.name]: newQuantity,
    });
  };

  const handleRemoveFromCart = async (e) => {
    e.preventDefault();
    if (products !== null) {
      if (listCart[e.currentTarget.id].id == e.currentTarget.name) {
        setProducts(
          products.filter((item,index) => item.id !== e.currentTarget.name)
        );
        dispatch(removeFromCart(e.currentTarget.name));
        delete quantity[e.currentTarget.name]

          await axios.delete(
            `https://akenord.onrender.com/api/carts/${
              client.username
            }/${e.currentTarget.name}`
          ).then((response) => {
          }).catch ((error) => {
            console.log(error);

          });
      }
    } else {
      setProducts({});
    }
  };

  const calculateCartSubtotal = () => {
    let subtotal = 0;
    if (products !== undefined) {
      products.forEach((product, index) => {
        const productPrice = parseFloat(product.discountPrice !== 0 ? product.discountPrice : product.price);
        const productQuantity = quantity[product.idCart];
        subtotal += productPrice * productQuantity;
      });
    }

    return parseFloat(subtotal.toFixed(2)); // Assuming you want to display the subtotal with 2 decimal places
  };

  const handleRegionsChange = (e) => {
    e.preventDefault();
    const name = e.currentTarget.name;
    let price = 15;
    if (name === "regions" && e.currentTarget.value == 12)  {
      price = 30;
    }
    if(name !== "regions" &&  shipping.regions == 12){
      price = 30;
    }
    setShipping({
      ...shipping,
      [name]: e.currentTarget.value,
      price: price,
    });
  };

  const handleClickCoupon = async (e) => {
    e.preventDefault();
    if (coupon.name.trim() !== "") {
      try {
        const response = await axios.get(
          `https://akenord.onrender.com/api/coupons/search/findByCode?code=${coupon.name}`
        );
        setCoupon({ ...coupon, coupon: response.data });
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Empty");
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

  const navigateCheckout = () =>{
    if(products !== undefined && checkObjectisNotEmpty(quantity) !== "empty"){
      navigate('/checkout', { state: {products: products,quantity : quantity}});
    }
    
  }

  return (
    <main className="main">
      <BreadCrumb firstP={"Home"} secondP={"Shop"} thirdP={"Cart"} />

      <section className="cart section--lg container">
        <div className="table__container">
          <table className="table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th>Remove</th>
              </tr>
            </thead>

            <tbody>
              {products !== undefined &&
                products.map((value, index) => (
                  (value.stock !== 0 && <tr key={index}>
                    <td>
                      <img
                        src={JSON.parse(value.images)[0]}
                        alt=""
                        className="table__img"
                      />
                    </td>

                    <td>
                      <h3 className="table__title">{value.name}</h3>
                      {(value.size !== "" || value.size == null) && <p className="table__description">Size: {value.size.toUpperCase()}</p>}
                      {(value.color !== "" || value.color == null) && <p className="table__description">Color: {value.color}</p>}
                    </td>

                    <td>
                      <span className="table__price">
                        {value.discountPrice !== 0 ? value.discountPrice : value.price}Dh
                      </span>
                    </td>

                    <td>
                      <input
                        type="number"
                        className="quantity"
                        value={quantity[value.idCart]}
                        name={value.idCart}
                        onChange={handleQuantityChange}
                      />
                    </td>

                    <td>
                      <span className="table__subtotal">
                        {((value.discountPrice !== 0 ? value.discountPrice : value.price) * quantity[value.idCart]).toFixed(2)}Dh
                      </span>
                    </td>

                    <td>
                      <button
                        type="button"
                        id={index}
                        onClick={handleRemoveFromCart}
                        name={value.idCart}
                      >
                        <i
                          className="fi fi-rs-trash table__trash"
                          style={{ cursor: "pointer" }}
                        ></i>
                      </button>
                    </td>
                  </tr>)
                  
                ))}
            </tbody>
          </table>
        </div>

        <div className="cart__actions">
          <button className="btn flex btn--md" onClick={navigateCheckout}>
            <i className="fi-rs-shopping-bag"></i> Continue Shopping
          </button>
        </div>

        <div className="divider">
          <i className="fi fi-rs-fingerprint"></i>
        </div>

        <div className="cart__group grid">
          <div>
            <div className="cart__shipping">
              <h3 className="section__title">Calculate Shipping</h3>

              <form action="" className="form grid">
                <select
                  name="regions"
                  id="regions"
                  className="form__input"
                  value={shipping.regions}
                  onChange={handleRegionsChange}
                >
                  <option value="empty" disabled>
                    Select a Region
                  </option>
                  {regionsJson.map((value) => (
                    <option key={value.id} value={value.id}>
                      {value.region}
                    </option>
                  ))}
                </select>

                <div className="form__group grid">
                  <select
                    name="villes"
                    id="villes"
                    className="form__input"
                    value={shipping.villes}
                    onChange={handleRegionsChange}
                  >
                    <option value="empty" disabled>
                      Select a City
                    </option>
                    {villes.map((value) => (
                      <option key={value.id} value={value.id}>
                        {value.ville}
                      </option>
                    ))}
                  </select>

                  <input
                    type="text"
                    placeholder="PostCode / ZIP"
                    className="form__input"
                  />
                </div>
              </form>
            </div>

            <div className="cart__coupon">
              <h3 className="section__title">Apply Coupon</h3>

              <form  className="coupon__form form grid" onSubmit={handleClickCoupon}>
                <div className="form__group grid">
                  <input
                    type="text"
                    className="form__input"
                    placeholder="Enter Your Coupon"
                    value={coupon.name}
                    onChange={(e) =>
                      setCoupon({ ...coupon, name: e.target.value })
                    }
                  />

                  <div className="form__btn">
                    <button
                      type="submit"
                      className="btn flex btn--sm"
                    >
                      <i className="fi-rs-label"></i> Apply
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="cart__total">
            <h3 className="section__title">Cart Totals</h3>

            <table className="cart__total-table">
              <tbody>
                <tr>
                  <td>
                    <span className="cart__total-title">Cart Subtotal</span>
                  </td>
                  <td>
                    <span className="cart__total-price">
                      {calculateCartSubtotal()}Dh
                    </span>
                  </td>
                </tr>

                <tr>
                  <td>
                    <span className="cart__total-title">Shipping</span>
                  </td>
                  <td>
                    <span className="cart__total-price">
                      {shipping.price}Dh
                    </span>
                  </td>
                </tr>

                {checkObjectisNotEmpty(coupon.coupon) !== "empty" && (
                  <tr>
                    <td>
                      <span className="cart__total-title">Coupon</span>
                    </td>
                    <td>
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
                    <span className="cart__total-title">Total</span>
                  </td>
                  <td>
                    <span className="cart__total-price">
                      {checkObjectisNotEmpty(coupon.coupon) !== "empty"
                        ? coupon.coupon.discountType === "percentage"
                          ? (
                              calculateCartSubtotal() *
                                (1 - (coupon.coupon.value/100)) +
                              shipping.price
                            ).toFixed(2) + "Dh"
                          : (
                              calculateCartSubtotal() -
                              coupon.coupon.value +
                              shipping.price
                            ).toFixed(2) + "Dh"
                        : (calculateCartSubtotal() + shipping.price).toFixed(
                            2
                          ) + "Dh"}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>

            <a href="checkout.html" className="btn flex btn--md">
              <i className="fi fi-rs-box-alt"></i> Proceed To Checkout
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
