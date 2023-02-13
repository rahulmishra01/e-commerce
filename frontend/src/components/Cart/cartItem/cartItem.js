import React from "react";
import { Link } from "react-router-dom";
import "./cartItem.css";

const CartItem = ({ item, deletecartItems }) => {

  return (
    <div className="CartItemCard">
      <img src={item.image} alt="avatar" />
      <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>{`price: ₹${item.price}`}</span>
        <p onClick={() => deletecartItems(item.product)}>Remove</p>
      </div>
    </div>
  );
};

export default CartItem;
