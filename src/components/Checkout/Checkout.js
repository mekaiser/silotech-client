import React from "react";
import CheckoutProducts from "../CheckoutProducts/CheckoutProducts";
import Header from "../Header/Header";
import "./Checkout.css";

const Checkout = () => {
  return (
    <section className="App">
      <Header></Header>
      <h1 style={{ fontWeight: "600" }} className="mt-5 mb-4">
        Your Selected Products
      </h1>
      <div className="container">
        <p className="order-title">
          <span style={{ display: "inline-block", width: "40%" }}>
            Product Name
          </span>
          <span style={{ display: "inline-block", width: "25%" }}>ID</span>
          <span style={{ display: "inline-block", width: "35%" }}>Price</span>
        </p>
        
          <CheckoutProducts></CheckoutProducts>
        
      </div>
    </section>
  );
};

export default Checkout;
