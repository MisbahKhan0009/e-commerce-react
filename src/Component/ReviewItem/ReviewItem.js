import React from "react";
import "./ReviewItem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const ReviewItem = ({ product, handleRemoveItem }) => {
  const { id, name, price, quantity, img, shipping } = product;
  return (
    <div className="review-item">
      <img src={img} alt="" />
      <div className="review-details-container">
        <div className="review-details">
          <p>{name}</p>
          <p>
            Price: <span className="details-text">${price}</span>
          </p>
          <p>
            Quantity: <span className="details-text"> {quantity}</span>
          </p>
          <p>
            Shipping: <span className="details-text">${shipping}</span>
          </p>
        </div>
        <div className="delete-container">
          <button
            onClick={() => {
              handleRemoveItem(id);
            }}
            className="btn-delete"
          >
            <FontAwesomeIcon
              className="delete-icon"
              icon={faTrashAlt}
              color="#EB5757"
            ></FontAwesomeIcon>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewItem;
