import React from "react";
import Facture from "../Email/Facture";
import { useState } from "react";
import ReactLoading from 'react-loading';

export default function Orders({ orders }) {
  const [loading, setLoading] = useState(false)
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const downloadFacture = (e) => {
    e.preventDefault();
    setLoading(true);

    const specificOrder = orders.filter((value) => (value.id == e.target.id))[0];

    Facture(specificOrder);
    setTimeout(() => setLoading(false),5000);
  };
  return (
    <table className="placed__order-table">
      {loading && <div style={{position:"absolute", top: "60%" , left: "60%", transform: "translateX(-50%)", zIndex:"100",width:"200px"}}>
        <ReactLoading type="spin" color="black" height={'20%'} width={'20%'} />
        </div>}
      <thead>
        <tr>
          <th>Orders</th>
          <th>Date</th>
          <th>Status</th>
          <th>Total</th>
          <th>Facture</th>
        </tr>
      </thead>

      <tbody>
        {orders.length !== 0 &&
          orders.map((value) => (
            <tr key={value.id}>
              <td>#{value.id}</td>
              <td>
                {new Date(value.order_date).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </td>
              <td>{capitalizeFirstLetter(value.status)}</td>
              <td>{value.orderTotal}Dh</td>
              <td>
                <button
                  type="button"
                  style={{ cursor: "pointer" }}
                  id={value.id}
                  className="view__order"
                  onClick={downloadFacture}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
