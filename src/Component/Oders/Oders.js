import React, { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Cart from "../Cart/Cart";
import ReviewItem from "../ReviewItem/ReviewItem";
import { deleteShoppingCart, removeFromDb } from "../../utilities/fakedb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Oders = () => {
  const { initialCart } = useLoaderData();
  const [cart, setCart] = useState(initialCart);
  const handleRemoveItem = (id) => {
    const remaining = cart.filter((product) => product._id !== id);
    setCart(remaining);
    removeFromDb(id);
  };

  const clearCart = () => {
    setCart([]);
    deleteShoppingCart();
  };
  return (
    <div className="shop-container">
      <div className="orders-container">
        {cart.map((product) => (
          <ReviewItem
            key={product._id}
            product={product}
            handleRemoveItem={handleRemoveItem}
          ></ReviewItem>
        ))}
        {cart.length === 0 && (
          <h2 style={{ margin: "20px" }}>
            No Items for Review. Please <Link to="/">Shop more</Link>
          </h2>
        )}
      </div>
      <div className="cart-container">
        <Cart clearCart={clearCart} cart={cart}>
          <Link to="/shipping">
            <button className="btn-review">
              Procced Shipping
              <span className="text-icon">
                <FontAwesomeIcon icon={faArrowRight} />
              </span>
            </button>
          </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Oders;
