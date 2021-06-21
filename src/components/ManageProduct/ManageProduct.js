import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import "./ManageProduct.css";

const ManageProduct = (props) => {
  const productsLength = props.productsLength;
  const setProductsLength = props.setProductsLength;
  const { name, id, price } = props.product;
  const [productID, setProductID] = useState('');

  useEffect(() => {
    fetch(`http://localhost:5000/deleteProduct/${productID}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        if (result) {
          setProductsLength(productsLength - 1);
        }
      });
  }, [productID, setProductsLength, productsLength]);

  return (
    <p className="manage-product-each">
      <span style={{ display: "inline-block", width: "40%" }}>{name}</span>
      <span style={{ display: "inline-block", width: "20%" }}>{id}</span>
      <span style={{ display: "inline-block", width: "20%" }}>${price}</span>
      <span style={{ display: "inline-block", width: "20%" }}>
        {" "}
        <Button
          onClick={() => setProductID(id)}
          className="manage-product-del-btn"
        >
          Delete
        </Button>{" "}
      </span>
    </p>
  );
};

export default ManageProduct;
