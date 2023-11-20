import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../actions/WishlistActions";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { addToCart } from "../../actions/CartActions";

const override = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

export default function DetailProduct({ product, client }) {
  const ObjectWishlists = useSelector((state) => state.wishlist.products);
  const ObjectCart = useSelector((state) => state.cart.products);
  const [loading, setLoading] = useState(false);
  const [mainImg, setMainImg] = useState("");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    setMainImg(JSON.parse(product.images)[0]);
    setColor(product.colors.length !== 0 ? product.colors[0].name : "");
    setSize(product.sizes.length !== 0 ? product.sizes[0].name : "");
  }, [product]);

  useEffect(() => {
    setWishlist(ObjectWishlists);
    setCart(ObjectCart);
  }, [ObjectWishlists, ObjectCart]);

  const handleImageClick = (e) => {
    e.preventDefault();
    setMainImg(e.target.src);
  };

  const handleColorClick = (e) => {
    e.preventDefault();
    const newColor = e.target.title;

    if (e.currentTarget.id === "image") {
      setMainImg(e.currentTarget.src);
    }

    setColor(newColor);
  };

  const handleSizeClick = (e) => {
    e.preventDefault();
    setSize(e.target.value);
  };

  const handleCartClick = async (e) => {
    e.preventDefault();
    console.log(client.username);
    if (client.username !== "") {
      setLoading(true);
      let object = {
        username: client.username,
        product_name: product.name,
        quantity: quantity,
        size: size,
        color: color,
        created_at: new Date(),
      };
      try {
        const response = await axios.post(
          "https://akenord.ma:8443/api/carts",
          object
        );
        dispatch(
          addToCart({
            name: object.product_name,
            quantity: object.quantity,
            size: object.size,
            color: object.color,
            id: response.data.id,
          })
        );
        console.log('yes');
        setLoading(false);
      } catch (error) {
        setLoading(false);
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
              `https://akenord.ma:8443/api/wishlists/${
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
              "https://akenord.ma:8443/api/wishlists",
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
          <h2 className="details__title">{product.name}</h2>
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
                    {value.type === "image" ? (
                      <img
                        className={
                          "color__link" +
                          (color === value.name ? " active__color" : "")
                        }
                        src={value.value}
                        onClick={(e) => handleColorClick(e)}
                        id={value.type}
                        title={value.name}
                      />
                    ) : (
                      <div
                        className={
                          "color__link" +
                          (color === value.name ? " active__color" : "")
                        }
                        style={{backgroundColor:value.value}}
                        onClick={(e) => handleColorClick(e)}
                        id={value.type}
                        title={value.name}
                      ></div>
                    )}
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

            <ClipLoader
              color={"#ffab07"}
              loading={loading}
              cssOverride={override}
              size={150}
              aria-label="Loading Spinner"
              data-testid="loader"
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
              style={{ cursor: "pointer" }}
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
    </section>
  );
}
