import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../actions/WishlistActions";
import { addToCart } from "../../actions/CartActions";
import { Alert, AlertTitle } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function DetailProduct({ product, client }) {
  const ObjectWishlists = useSelector((state) => state.wishlist.products);
  const ObjectCart = useSelector((state) => state.cart.products);
  const [addedSuccessfully, setAddedSuccessfully] = useState(false);
  const [mainImg, setMainImg] = useState("");
  const [color, setColor] = useState(
    product.colors.length !== 0 ? product.colors[0].name : ""
  );
  const [size, setSize] = useState(
    product.sizes.length !== 0 ? product.sizes[0].name : ""
  );
  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState(ObjectWishlists);
  const [cart, setCart] = useState(ObjectCart);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    setMainImg(JSON.parse(product.images)[0]);
  }, [product]);

  useEffect(() => {
    setWishlist(ObjectWishlists);
    setCart(ObjectCart);
  }, [ObjectWishlists, ObjectCart]);

  const handleImageClick = (e) => {
    e.preventDefault();
    setMainImg(e.target.src);
  };

  const handleImageColorClick = (e,img) => {
    e.preventDefault();
    setMainImg(img);
  };

  const handleColorClick = (e) => {
    e.preventDefault();
    setColor(e.target.value);
  };

  const handleSizeClick = (e) => {
    e.preventDefault();
    setSize(e.target.value);
  };

  const handleCartClick = async (e) => {
    e.preventDefault();
    if (client.username !== "") {
      if (cart !== null && cart.includes(product.name)) {
        setCart(cart.filter((item) => item !== product.name));
        dispatch(removeFromCart(product.name));

        try {
          const response = await axios.delete(
            `http://localhost:8080/api/carts/${
              client.username
            }/${product.name.replace(/\s/g, "-")}`
          );
        } catch (error) {
        }
      } else {
        if(cart.filter(value => (value.name == product.name && value.size == size && value.color == color)).length !== 0){
          return setAddedSuccessfully(true);

        }
        let object = {
          username: client.username,
          product_name: product.name,
          quantity: quantity,
          size: size,
          color: color,
          created_at: new Date(),
        };
        try {
          await axios
            .post("http://localhost:8080/api/carts", object)
            .then((response) => {
              cart !== null
                ? setCart([...cart, object.product_name])
                : setCart([object.product_name]);
              dispatch(
                addToCart({
                  name: object.product_name,
                  quantity: object.quantity,
                  size: object.size,
                  color: object.color,
                  id: response.data.id,
                })
              );
              setAddedSuccessfully(true);
            });
        } catch (error) {
        }
      }
    } else {
      navigate("/login");
    }
  };

  const handleWishlistClick = async (e) => {
    e.preventDefault();
    if (client.username !== "") {
      if (wishlist !== null) {
        if (wishlist.includes(product.name)) {
          setWishlist(wishlist.filter((item) => item !== product.name));
          dispatch(removeFromWishlist(product.name));

          try {
            const response = await axios.delete(
              `http://localhost:8080/api/wishlists/${
                client.username
              }/${product.name.replace(" ", "-")}`
            );
          } catch (error) {
            console.log(error);
          }
        } else {
          let object = {
            username: client.username,
            product_name: product.name,
            created_at: new Date(),
          };
          setWishlist([...wishlist, object.product_name]);
          dispatch(addToWishlist(object.product_name));

          try {
            const response = await axios.post(
              "http://localhost:8080/api/wishlists",
              object
            );
          } catch (error) {
            console.log(error);
          }
        }
      } else {
        setWishlist({});
      }
    } else {
      navigate("/login");
    }
  };

  const handleQuantityChange = (e) => {
    let newQuantity = parseInt(e.target.value);

    if (newQuantity >= product.stock) {
      newQuantity = product.stock;
    }

    // Check if the new quantity is 0 or less and set it to 1 if it is
    if (newQuantity <= 0) {
      newQuantity = 1;
    }

    if (newQuantity >= 5) {
      newQuantity = 5;
    }

    setQuantity(newQuantity);
  };

  useEffect(() => {
    if (addedSuccessfully) {
      setTimeout(() => setAddedSuccessfully(false), 4000);
    }
  }, [addedSuccessfully]);

  return (
    <section className="details section--lg">
      <div className="details__container container grid">
        <div className="details__group">
          <img src={mainImg} alt="" className="details__img" />
          <div className="details__small-images grid">
            {JSON.parse(product.images).map((product, key) => (
              <img
                key={key}
                src={product}
                alt=""
                className="details__small-img"
                onClick={handleImageClick}
              />
            ))}
          </div>
        </div>

        <div className="details__group">
          <h3 className="details__title">{product.name}</h3>
          <p className="details__brand">
            Category: <span>{product.subcategory}</span>
          </p>

          <div className="details__price flex">
            {product.discountPrice !== 0 && (
              <span className="new__price">{product.discountPrice}Dh</span>
            )}
            <span
              className={
                product.discountPrice !== 0 ? "old__price" : "new__price"
              }
            >
              {product.price}Dh
            </span>
            {product.discountPrice !== 0 && (
              <span className="save__price">
                {parseInt(
                  ((product.price - product.discountPrice) / product.price) *
                    100
                ) + "%"}
              </span>
            )}
          </div>

          <p className="short__description">{product.description}</p>

          <ul className="product__list">
            <li className="list__item flex">
              <i className="fi-rs-crown"></i> 1 Year Akenord Brand Warranty
            </li>

            <li className="list__item flex">
              <i className="fi-rs-refresh"></i> 30 Day Return Policy
            </li>

            <li className="list__item flex">
              <i className="fi-rs-credit-card"></i> Cash on Delivery available
            </li>
          </ul>
          {product.colors.length !== 0 && (
            <div className="details__color flex">
              <span className="details__color-title">Color</span>

              <ul className="color__list">
                {product.colors.map((value, key) => (
                  <li key={key}>
                    <button
                      className={
                        "color__link" +
                        (color === value.name ? " active__color" : "")
                      }
                      style={{
                        background:
                          value.type === "color"
                            ? value.value
                            : `url(${value.value})`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center center",
                        cursor: "pointer",
                      }}
                      onClick={handleColorClick}
                      value={value.name}
                      title={value.name}
                      onClick={value.type !== "color" && ((e) => handle)}</li>}
                    ></button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {product.sizes.length !== 0 && (
            <div className="details__size flex">
              <span className="details__size-title">Size</span>

              <ul className="size__list">
                {product.sizes.map((value, key) => (
                  <li key={key}>
                    <button
                      className={
                        "size__link " +
                        (size === value.name ? "size-active" : "")
                      }
                      style={{ cursor: "pointer" }}
                      onClick={handleSizeClick}
                      value={value.name}
                    >
                      {value.name.toUpperCase()}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="details__action">
            <input
              type="number"
              className="quantity"
              value={quantity}
              onChange={handleQuantityChange}
            />

            <button
              className={
                product.stock !== 0 ? "btn" : "btn__disabled" + " btn--sm"
              }
              onClick={handleCartClick}
            >
              {product.stock !== 0 ? "Add to Cart" : "Out Of Stock"}
            </button>

            <button
              onClick={handleWishlistClick}
              className="details__action-btn"
            >
              <i
                className={
                  wishlist !== null
                    ? wishlist.includes(product.name)
                      ? "fi fi-ss-heart"
                      : "fi fi-rs-heart"
                    : "fi fi-rs-heart"
                }
              ></i>
            </button>
          </div>

          <ul className="details__meta">
            <li className="meta__list flex">
              <span>SKU:</span> {product.sku}
            </li>
            <li className="meta__list flex">
              <span>Availability:</span> {product.stock + " Items In Stock "}
            </li>
          </ul>
        </div>
      </div>
      {addedSuccessfully && 
      <div class="custom-alert">
        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          Added Successfully
        </Alert>
      </div>}
    </section>
  );
}
