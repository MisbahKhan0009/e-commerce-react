import React from "react";
import "./Cart.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faTrashCan } from "@fortawesome/free-solid-svg-icons";

const Cart = (props) => {
  const { cart, clearCart, children } = props;
  let total = 0;
  let shipping = 0;
  let tax = 0;
  let grandTotal;
  let quantity = 0;
  for (const product of cart) {
    quantity = quantity + product.quantity;
    total = total + product.price * product.quantity;
    shipping = shipping + product.shipping;
  }
  tax = (total * 0.1).toFixed(2);
  grandTotal = (total + Number(tax) + shipping).toFixed(2);
  return (
    <div className="cart">
      <h2 className="order-summary-heading">Order Summary</h2>
      <p>Selected Items: {quantity}</p>
      <p>Total Price: ${total}</p>
      <p>Total Shipping: ${shipping}</p>
      <p>Tax: ${tax}</p>
      <p>
        <strong>Grand Total: ${grandTotal}</strong>
      </p>
      <button className="btn-clear" onClick={clearCart}>
        Clear Cart<span className="text-icon"><FontAwesomeIcon icon={faTrashAlt} /></span>
      </button>
      {children}
    </div>
  );
};

export default Cart;
