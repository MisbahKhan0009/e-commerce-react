import React, { useEffect, useState } from "react";
import "./Shop.css";
import Product from "../Product/Product";
import Cart from "../Cart/Cart";
import {
  addToDb,
  deleteShoppingCart,
  getStoredCart,
} from "../../utilities/fakedb";
import { Link, useLoaderData } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Shop = () => {
  // const { count, products } = useLoaderData();
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [cart, setCart] = useState([]);
  const [page, setPage] = useState(0);
  let [size, setSize] = useState(10);
  console.log(count);
  console.log(products);
  const pages = Math.ceil(count / size);

  useEffect(() => {
    const url = `http://localhost:5000/products?page=${page}&size=${size}`;
    console.log(page, size);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setCount(data.count);
        setProducts(data.products);
      });
  }, [page, size]);

  const clearCart = () => {
    setCart([]);
    deleteShoppingCart();
  };

  useEffect(() => {
    const storedCart = getStoredCart();
    const savedCart = [];
    for (const id in storedCart) {
      const addedProduct = products.find(
        (selectedProduct) => selectedProduct._id === id
      );
      if (addedProduct) {
        const quantity = storedCart[id];
        addedProduct.quantity = quantity;
        savedCart.push(addedProduct);
      }
    }
    setCart(savedCart);
  }, [products]);

  useEffect(() => {
    const storedCart = getStoredCart();
    const savedCart = [];
    const ids = Object.keys(storedCart);
    console.log(ids);
    fetch("http://localhost:5000/productsByIds", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(ids),
    })
      .then((res) => res.json())
      .then((data) => {
        for (const id in storedCart) {
          const addedProduct = data.find((product) => product._id === id);
          if (addedProduct) {
            const quantity = storedCart[id];
            addedProduct.quantity = quantity;
            savedCart.push(addedProduct);
          }
        }
        setCart(savedCart);
      });
  }, [products]);

  const handleAddToCart = (selectedProduct) => {
    let newCart = [];
    const exists = cart.find((product) => product._id === selectedProduct._id);
    if (!exists) {
      selectedProduct.quantity = 1;
      newCart = [...cart, selectedProduct];
    } else {
      const rest = cart.filter(
        (product) => product._id !== selectedProduct._id
      );
      exists.quantity++;
      newCart = [...rest, exists];
    }

    setCart(newCart);
    addToDb(selectedProduct._id);
  };

  return (
    <div className="shop-container">
      <div className="products-container">
        {products.map((selectedProduct) => (
          <Product
            key={selectedProduct._id}
            selectedProduct={selectedProduct}
            handleAddToCart={handleAddToCart}
          ></Product>
        ))}
      </div>
      <div className="cart-container">
        <Cart clearCart={clearCart} cart={cart}>
          <Link to="/orders">
            <br />
            <button className="btn-review">
              Review Order
              <span className="text-icon">
                <FontAwesomeIcon icon={faArrowRight} />
              </span>
            </button>
          </Link>
        </Cart>
      </div>
      <div className="pagination">
        <div className="view-product">
          <div>
            <p>
              Page {page + 1} of {pages}
            </p>
          </div>
          <div className="view-product-inner">
            <p className="view-product-inner-text">view</p>
            <select
              className="view-product-inner-option"
              onChange={(event) => setSize(event.target.value)}
            >
              <option value="5">5</option>
              <option value="10" selected>
                10
              </option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
            <p className="view-product-inner-text">product per page</p>
          </div>
        </div>
        <div>
          {[...Array(pages).keys()].map((number) => (
            <button
              key={number}
              className={page === number ? "selected" : ""}
              onClick={() => setPage(number)}
            >
              {number + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
