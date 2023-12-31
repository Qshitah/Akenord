import React, { useRef, useState } from "react";
import BreadCrumb from "../Shop/BreadCrumb";
import CheckoutForm from "./CheckoutForm";
import CheckoutProduct from "./CheckoutProduct";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import regions from "../../json/regions.json";
import villesJson from "../../json/villes.json";
import { Toast } from "primereact/toast";

export default function Checkout({ client, userData }) {
  const location = useLocation();
  const navigate = useNavigate();

  const [villes, setVilles] = useState([]);

  const [erreur, setErreur] = useState({
    erreur: "",
    type: "",
  });

  const [data, setData] = useState();

  const calculateCartSubtotal = () => {
    let subtotal = 0;
    if (data !== undefined) {
      data.products.forEach((value, index) => {
        const productPrice = parseFloat(
          value.discountPrice !== 0 ? value.discountPrice : value.price
        );
        const productQuantity = data.quantity[value.idCart];
        subtotal += productPrice * productQuantity;
      });
    }

    return parseFloat(subtotal.toFixed(2)); // Assuming you want to display the subtotal with 2 decimal places
  };

  const [shipping, setShipping] = useState({
    region: {
      id: 1,
      region: "Tanger-Tétouan-Al Hoceïma",
    },
    city: {
      id: "10",
      ville: "Ajdir‎",
      region: "1",
    },

    price: 30,
  });

  const [orderData, setOrderData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    address: "",
    region: "Tanger-Tétouan-Al Hoceïma",
    city: "Ajdir‎",
    email: "",
    phoneNumber: "",
    postalCode: "",
    orderNote: "",
    paiment: "Cash on Delivery",
    products: [],
    coupon: "",
    orderTotal: 0,
    shippingPrice: shipping.price,
    currentDate: new Date(),
  });

  useEffect(() => {
    setVilles(villesJson.filter((value) => shipping.region.id == value.region));
  }, [shipping.region]);

  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    setOrderData({
      ...orderData,
      [name]: e.target.value,
    });
  };

  const handleRegionsChange = (e) => {
    e.preventDefault();
    const name = e.currentTarget.name;
    console.log(e.currentTarget.value);
    let price = 30;
    if (
      name !== "region" &&
      ["382", "346", "130", "209", "215", "248"].includes(e.currentTarget.value)
    ) {
      price = 15;
    }
    if (orderData.products.length >= 3) {
      price = 0;
    }
    if (name === "region") {
      const selectedRegion = regions.find(
        (value) => value.id == e.currentTarget.value
      );
      setShipping({
        ...shipping,
        [name]: selectedRegion,
        price: price,
      });
      setOrderData({ ...orderData, shippingPrice: price });
    } else {
      const selectedRegion = villesJson.find(
        (value) => value.id == e.currentTarget.value
      );
      setShipping({
        ...shipping,
        [name]: selectedRegion,
        price: price,
      });
      setOrderData({ ...orderData, shippingPrice: price });
    }
  };

  const addRegion = (option, selectedRegion) => {
    if (option === "region") {
      setOrderData({
        ...orderData,
        region: selectedRegion,
      });
    } else {
      setOrderData({
        ...orderData,
        city: selectedRegion,
      });
    }
  };

  useEffect(() => {
    if (!location.state) {
      navigate("/cart");
    } else {
      const { products, quantity } = location.state;
      setData({
        products: products,
        quantity: quantity,
      });
    }
  }, [location, navigate]);

  useEffect(() => {
    if (userData) {
      setOrderData({
        ...orderData,
        username: client.username,
        firstName: userData.first_name,
        lastName: userData.last_name,
        phoneNumber: userData.phone_number,
        email: userData.email,
      });
    }
  }, [userData]);

  useEffect(() => {
    if (data !== undefined) {
      data.products.forEach((value) => {
        orderData.products.push([
          JSON.parse(value.images)[0],
          value.name,
          data.quantity[value.idCart],
          value.discountPrice !== 0 ? value.discountPrice : value.price,
          value.size,
          value.color,
        ]);
      });
      // Make sure to update the state to trigger a re-render
      orderData.products.length >= 3 && setShipping({ ...shipping, price: 0 });
      orderData.products.length >= 3
        ? setOrderData({
            ...orderData,
            products: orderData.products,
            orderTotal: calculateCartSubtotal(),
            shippingPrice: 0,
          })
        : setOrderData({
            ...orderData,
            products: orderData.products,
            orderTotal: calculateCartSubtotal(),
          });
    }
  }, [data]);

  useEffect(() => {
    if (orderData.orderTotal !== 0) {
      setOrderData({
        ...orderData,
        total:
          orderData.coupon == ""
            ? (orderData.orderTotal + orderData.shippingPrice).toFixed(2)
            : orderData.coupon.discountType === "percentage"
            ? (
                orderData.orderTotal * (1 - orderData.coupon.value / 100) +
                orderData.shippingPrice
              ).toFixed(2)
            : (
                orderData.orderTotal -
                orderData.coupon.value +
                orderData.shippingPrice
              ).toFixed(2),
      });
    }
  }, [orderData.orderTotal, orderData.coupon, orderData.shippingPrice]);

  return (
    <main className="main">
      <BreadCrumb firstP="Home" secondP="Shop" thirdP="Checkout" />

      <section className="checkout section--lg">
        <div className="checkout__container container grid">
          <CheckoutForm
            client={client}
            shipping={shipping}
            villes={villes}
            setShipping={setShipping}
            orderData={orderData}
            handleChange={handleChange}
            addRegion={addRegion}
            erreur={erreur}
            setErreur={setErreur}
            handleRegionsChange={handleRegionsChange}
          />
          {data !== null && (
            <CheckoutProduct
              data={data}
              shippingPrice={shipping.price}
              orderData={orderData}
              setOrderData={setOrderData}
              erreur={erreur}
              calculateCartSubtotal={calculateCartSubtotal}
            />
          )}
        </div>
      </section>
    </main>
  );
}
