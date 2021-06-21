import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../App";
import "./CheckoutProducts.css";

const CheckoutProducts = () => {
  const [order, setOrder] = useContext(UserContext);
  let history = useHistory();
  const handleOrderedProducts = () => {
    const url = `/shipment`;
    history.push(url);
  }
  return (
    <div>
      <p className="ordered-product-each">
        <span style={{ display: "inline-block", width: "40%" }}>
          {order.pdName}
        </span>
        <span style={{ display: "inline-block", width: "25%" }}>
          {order.pdId}
        </span>
        <span style={{ display: "inline-block", width: "35%" }}>
          {order.pdPrice}
        </span>
      </p>
      <Button onClick={handleOrderedProducts} className="checkout-btn">Checkout</Button>
    </div>
  );
};

export default CheckoutProducts;
