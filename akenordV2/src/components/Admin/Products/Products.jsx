import React from "react";
import BreadCrumb from "../BreadCrumb";
import Dropdown from "react-bootstrap/Dropdown";
import { Nav, NavDropdown } from "react-bootstrap";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

export default function Products({ listProducts,client }) {

  const [orderProducts,setOrderProducts] = useState([]);

  
  useEffect(() => {
    const fetchOrderProducts = async () => {
      await axios.post( "https://akenord.onrender.com/api/productsOrders",client)
        .then((response) =>{
          setOrderProducts(response.data)
        }).catch((error) =>{
          console.log(error);
        })
    }

    fetchOrderProducts();
   
  }, []);

  return (
    <div className="content">
      <BreadCrumb title="Products" firstP="Home" secondP="Products" />
      <div className="row">
        <div className="col-12">
          <div className="card card-default">
            <div className="card-body">
              <div className="table-responsive">
                <table
                  className="table"
                  style={{ width: "100%", tableLayout: "auto" }}
                >
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Offer</th>
                      <th>Purchased</th>
                      <th>Stock</th>
                      <th>Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {listProducts.map((value, index) => (
                      <tr key={index}>
                        <td>
                          <img
                            className="tbl-thumb"
                            src={JSON.parse(value.images)[0]}
                            alt="Product Image"
                          />
                        </td>
                        <td>{value.name}</td>
                        <td>{value.price}Dh</td>
                        <td>{value.discountPrice}Dh</td>
                        <td>{orderProducts.filter(item => item === value.name).length}</td>
                        <td>{value.stock}</td>
                        <td>{value.createdAt}</td>
                        <td>
                          <div className="">
                            <NavDropdown
                              id="nav-dropdown-dark-example"
                              title="Info"
                              menuVariant="dark"
                            >
                              <NavDropdown.Item href="#action/3.1">
                                Edit
                              </NavDropdown.Item>
                              <NavDropdown.Item href="#action/3.2">
                                Delete
                              </NavDropdown.Item>
                            </NavDropdown>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
