import React, { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { UserContext } from "../../App";
import Header from "../Header/Header";
import "./Shipment.css";

const Shipment = () => {
  const [loggedInUser, setLoggedInUser, order, setOrder] = useContext(UserContext);
  const [shipment, setShipment] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });
  const handleBlur = (e) => {
    const newShipment = { ...shipment };
    newShipment[e.target.name] = e.target.value;
    console.log(newShipment);
    setShipment(newShipment);
  };
  const handleSubmit = (e) => {
    const orderedDetails = {
      ...loggedInUser,
      order,
      shipment,
      date: new Date(),
    };

    fetch("https://nameless-spire-32810.herokuapp.com/addOrder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderedDetails),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          const blankSetOrder = { ...order };
          blankSetOrder.pdName = "";
          blankSetOrder.pdId = "";
          blankSetOrder.pdPrice = "";
          setOrder(blankSetOrder);
          alert("Your order placed successfully");
        }
      });

    e.preventDefault();
  };
  return (
    <>
      <Header></Header>
      <div className="container App mt-5">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label style={{ fontWeight: "600" }}>Name</Form.Label>
            <Form.Control
              onBlur={handleBlur}
              defaultValue={loggedInUser.name}
              name="name"
              type="text"
              placeholder="Enter your name"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label style={{ fontWeight: "600" }}>Email</Form.Label>
            <Form.Control
              onBlur={handleBlur}
              defaultValue={loggedInUser.email}
              name="email"
              type="text"
              placeholder="Enter your email"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label style={{ fontWeight: "600" }}>Address</Form.Label>
            <Form.Control
              onBlur={handleBlur}
              name="address"
              type="text"
              placeholder="Enter your address"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label style={{ fontWeight: "600" }}>Phone Number</Form.Label>
            <Form.Control
              onBlur={handleBlur}
              name="phone"
              type="text"
              placeholder="Enter phone number"
              required
            />
          </Form.Group>

          <Button className="admin-btn" type="submit">
            Plade Order
          </Button>
        </Form>
      </div>
    </>
  );
};

export default Shipment;
