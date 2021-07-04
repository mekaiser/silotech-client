import React, { useContext } from "react";
import { Button, Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../App";
import "./ItemCard.css";

const ItemCard = (props) => {
  const [order, setOrder] = useContext(UserContext);
  const { name, price, imgURL, id } = props.product;
  let history = useHistory();
  const handleBuyNow = () => {
    const buyingProduct = { ...order };
    buyingProduct.pdName = name;
    buyingProduct.pdId = id;
    buyingProduct.pdPrice = price;
    setOrder(buyingProduct);
    const url = `/checkout/${id}`;
    history.push(url);
  };
  return (
    <div className="col-md-4 col-sm-6 d-flex justify-content-center">
      <Card className="card-style shadow">
        <Card.Img className="card-img-custom" variant="top" src={imgURL} />
        <Card.Body>
          <Card.Title style={{ textAlign: "center", height: "50px" }}>
            {" "}
            <h4 style={{ fontWeight: "600" }}>{name}</h4>{" "}
          </Card.Title>
          <Card.Text className="price-and-buy-now mb-3">
            <span style={{ color: "tomato" }} className="price">
              ${price}
            </span>
            <Button onClick={handleBuyNow} className="buy-now-btn">
              Buy Now
            </Button>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ItemCard;
