import React, { useEffect, useState } from "react";
import BreadCrumb from "../Shop/BreadCrumb";
import { removeFromWishlist } from "../../actions/WishlistActions";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default function Wishlist({ listProducts, listWishlist, client }) {
  const [products, setProducts] = useState();

  const dispatch = useDispatch();


  useEffect(() => {
    setProducts(
      listProducts.filter((value) => listWishlist.includes(value.name))
    );
  }, [listProducts, listWishlist]);

  
  const handleRemoveFromWishlist = async (e) =>{
    e.preventDefault();
    if(products !== null){
      if(listWishlist.includes(e.currentTarget.name)){
        setProducts(products.filter(item => item.name !== e.currentTarget.name));
        dispatch(removeFromWishlist(e.currentTarget.name));

        try {
          const response = await axios.delete(
            `https://akenord.onrender.com/api/wishlists/${client.username}/${e.currentTarget.name.replace(/\s/g, '-')}`
          );
        } catch (error) {
          console.log(error);
        }

      }
      

    }else{
      setProducts({})
    }
  }

  return (
    <main className="main">
      <BreadCrumb firstP="Home" secondP="Shop" thirdP="Wishlist" />
      <section className="wishlist section--lg container">
        <div className="table__container">
          <table className="table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Stock Status</th>
                <th>Remove</th>
              </tr>
            </thead>

            <tbody>

              {products !== undefined && products.map((value,index) => (
              <tr key={value.name}>
                <td>
                  <img
                    src={JSON.parse(value.images)[0]}
                    alt=""
                    className="table__img"
                  />
                </td>

                <td>
                  <Link to={"../details?id="+ index + "&search=" + value.name.toLowerCase().replace(/\s+/g, "-")} >
                    <h2 className="table__title">{value.name}</h2>
                    </Link>
                  <p className="table__description">{value.description}</p>
                </td>

                <td>
                  <span className="table__price">{value.discountPrice === 0 ? value.price : value.discountPrice}</span>
                </td>

                <td>
                  <span className="table__stock" style={{color : value.stock === 0 ? "red" : "black"}}>{value.stock === 0 ? "Out of Stock" : "In Stock"}</span>
                </td>

                <td >
                  <button type="button" onClick={handleRemoveFromWishlist} name={value.name}>
                  <i  className="fi fi-rs-trash table__trash" style={{cursor: "pointer"}} ></i>
                  </button>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
