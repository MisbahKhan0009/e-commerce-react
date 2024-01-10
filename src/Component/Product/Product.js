import React from "react";
import "./Product.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";

const Product = (props) => {
  let { handleAddToCart, product } = props;
  let { name, img, seller, price, ratings } = product;

  return (
    <div className="product">
      <img src={img} alt={name} />
      <div className="product-info">
        <p className="product-name">{name}</p>
        <p className="product-price">Prics: ${price}</p>

        <p>
          <small>Manufacturer: {seller}</small>
        </p>
        <p>
          <small>Rating: {ratings}</small>
        </p>
      </div>
      <button onClick={() => handleAddToCart(product)} className="add-to-cart">
        <p>
          <span className="">Add To Cart</span> <FontAwesomeIcon icon={faCartPlus}></FontAwesomeIcon>
        </p>
      </button>
    </div>
  );
};

export default Product;
