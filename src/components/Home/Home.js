import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import Header from "../Header/Header";
import ItemCard from "../ItemCard/ItemCard";
import "./Home.css";

const Home = () => {
  const [products, setProducts] = useState();
  const [productLoaded, setProductLoaded] = useState(false);
  
  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setProductLoaded(true);
      });
  }, []);

  return (
    <div className="App">
      <Header></Header>
      {productLoaded ? (
        <section className="container item-cards">
          {products?.map((product) => (
            <ItemCard key={product.id} product={product}></ItemCard>
          ))}
        </section>
      ) : (
        <Spinner className="mt-5" animation="border" role="status">
          <span className="visually-hidden"></span>
        </Spinner>
      )}
    </div>
  );
};

export default Home;
