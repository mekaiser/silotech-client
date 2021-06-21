import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import Header from '../Header/Header';
import OrderedProducts from '../OrderedProducts/OrderedProducts';
import './Order.css';

const Order = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [orderedProducts, setOrderedProducts] = useState([]);
    useEffect(() => {
        fetch("http://localhost:5000/orderedProducts?email=" + loggedInUser.email)
      .then((res) => res.json())
      .then((data) => {
        setOrderedProducts(data);
      });
    }, [loggedInUser.email])
    return (
        <section className="App">
            <Header></Header>
            <h1 style={{ fontWeight: "600" }} className="mt-5 mb-4">
        Your Ordered Products
      </h1>
      <div className="container">
        <p className="order-title">
          <span style={{ display: "inline-block", width: "20%" }}>
            Date
          </span>
          <span style={{ display: "inline-block", width: "40%" }}>
            Product Name
          </span>
          <span style={{ display: "inline-block", width: "20%" }}>ID</span>
          <span style={{ display: "inline-block", width: "20%" }}>Price</span>
        </p>
        {
            orderedProducts?.map(OrderedProduct => <OrderedProducts OrderedProduct={OrderedProduct}></OrderedProducts>)
        }
          
        
      </div>
        </section>
    );
};

export default Order;