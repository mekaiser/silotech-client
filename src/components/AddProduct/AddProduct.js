import axios from "axios";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "./AddProduct.css";

const AddProduct = () => {
  const [ProductInfo, setProductInfo] = useState({
    name: "",
    id: "",
    price: "",
    imgURL: "",
  });
  const handleBlur = (e) => {
    const newProductInfo = { ...ProductInfo };
    newProductInfo[e.target.name] = e.target.value;
    setProductInfo(newProductInfo);
    console.log(newProductInfo);
  };
  const handleImageUpload = (e) => {
    const imageData = new FormData();
    imageData.set("key", "d0474fc409005ade448549f9e3a65fec");
    imageData.append("image", e.target.files[0]);

    axios
      .post("https://api.imgbb.com/1/upload", imageData)
      .then(function (response) {
        const newProductInfo = { ...ProductInfo };
        newProductInfo["imgURL"] = response.data.data.display_url;
        console.log(response.data.data.display_url);
        setProductInfo(newProductInfo);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const handleSubmit = (e) => {
    const url = `http://localhost:5000/addProduct`;

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ProductInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("server side response", data);
        const blankProductInfo = {
          name: "",
          id: "",
          price: "",
          imgURL: "",
        };
        setProductInfo(blankProductInfo);
      });
    e.preventDefault();
  };
  
  return (
    <div className="container">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label style={{ fontWeight: "600" }}>Product Name</Form.Label>
          <Form.Control
            onBlur={handleBlur}
            name="name"
            type="text"
            placeholder="Enter product name"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label style={{ fontWeight: "600" }}>Product ID</Form.Label>
          <Form.Control
            onBlur={handleBlur}
            name="id"
            type="text"
            placeholder="Enter product ID"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label style={{ fontWeight: "600" }}>Product Price</Form.Label>
          <Form.Control
            onBlur={handleBlur}
            name="price"
            type="text"
            placeholder="Enter product Price"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label style={{ fontWeight: "600" }}>Product Photo</Form.Label>
          <Form.Control
            onChange={handleImageUpload}
            name="imgURL"
            type="file"
            required
          />
        </Form.Group>

        <Button className="admin-btn" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AddProduct;
