import React from 'react';
import './OrderedProducts.css';

const OrderedProducts = (props) => {
    const {pdName, pdId, pdPrice, date} = props.OrderedProduct;
    return (
        <div>
      <p className="ordered-product-each">
        <span style={{ display: "inline-block", width: "20%" }}>
          {new Date(date).toDateString("dd/MM/yy")}
        </span>
        <span style={{ display: "inline-block", width: "40%" }}>
          {pdName}
        </span>
        <span style={{ display: "inline-block", width: "20%" }}>
          {pdId}
        </span>
        <span style={{ display: "inline-block", width: "20%" }}>
          ${pdPrice}
        </span>
      </p>
    </div>
    );
};

export default OrderedProducts;