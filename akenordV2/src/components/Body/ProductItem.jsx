import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addToWishlist, removeFromWishlist } from "../../actions/WishlistActions";
import axios from "axios";

export default function ProductItem({ value,index, client }) {

  const ObjectWishlists = useSelector((state) => state.wishlist.products);
  const [wishlist, setWishlist] = useState(ObjectWishlists);

  const ObjectCarts = useSelector((state) => state.cart.products);
  const [cart, setCart] = useState(ObjectCarts);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setWishlist(ObjectWishlists);
    setCart(ObjectCarts);
  }, [ObjectWishlists, ObjectCarts]);




  const handleWishlistClick = async (e) =>{
    e.preventDefault();
    if(wishlist !== null){
      if(wishlist.includes(value.name)){
        setWishlist(wishlist.filter(item => item !== value.name));
        dispatch(removeFromWishlist(value.name));

        try {
          const response = await axios.delete(
            `http://localhost:8080/api/wishlists/${client.username}/${value.name.replace(/\s/g, '-')}`
          );
          console.log(response.data);
        } catch (error) {
          console.log(error);
        }

      }else{
        let object = {
          username: client.username,
          product_name: value.name,
          created_at: new Date()
        }
        setWishlist([
          ...wishlist,
          object.product_name
        ])
        dispatch(addToWishlist(object.product_name));
  
        try {
          const response = await axios.post(
            "http://localhost:8080/api/wishlists",
            object
          );
          console.log(response.data);
        } catch (error) {
          console.log(error);
        }
      }
      

    }else{
      setWishlist({})
    }
  }
    
  return (
    <div className="product__item swiper-slide">
      <div className="product__banner">
        <Link
          to={"../details?id="+ index +"&search=" + value.name.toLowerCase().replace(/\s+/g, "-")} 
         className="product__images"
        >
          <img src={JSON.parse(value.images)[0]} alt="" className="product__img default" />

          <img src={JSON.parse(value.images)[1]} alt="" className="product__img hover" />
        </Link>

        <div className="product__actions">
          <Link
            to={"../details?id="+ index +"&search=" + value.name.toLowerCase().replace(/\s+/g, "-")}
            className="action__btn"
            aria-label="Quick View"
          >
            <i className="fi fi-rs-eye"></i>
          </Link>

          <Link onClick={handleWishlistClick} className="action__btn" aria-label={wishlist !== null ? wishlist.includes(value.name) ? "Remove From Wishlist" : "Add To Wishlist" : "Add To Wishlist"}>
            <i className={wishlist !== null ? wishlist.includes(value.name) ?"fi fi-ss-heart" : "fi fi-rs-heart" : "fi fi-rs-heart"}></i>
          </Link>
        </div>

        <div className="product__badge light-pink">{value.discountPrice !==0 ? parseInt(((value.price-value.discountPrice)/value.price)*100) + '%' : 'Hot'}</div>
      </div>

      <div className="product__content">
        <span className="product__category">{value.subcategory}</span>
        <Link to={"../details?id="+ index + "&search=" + value.name.toLowerCase().replace(/\s+/g, "-")}>
          <h3 className="product__name">{value.name}</h3>
        </Link>
        <div className="product__rating">
          {Array.from({ length: value.stars }, (_, index) => {
            <i className="fi fi-rs-star" key={index}></i>;
          })}
        </div>
        <div className="product__price flex">
          {value.discountPrice !== 0 && <span className="new__price">{value.discountPrice}Dh</span>}
          <span className={value.discountPrice !== 0 ? "old__price" : "new__price"}>{value.price}Dh</span>
        </div>

      </div>
    </div>
  );
}
