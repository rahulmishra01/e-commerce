import {
  ADD_TO_CART,
  REMOVE_TO_CART,
  SAVE_SHIPPING_INFO,
} from "../action_type/cartType";
import axios from "axios";

// Add To Cart
export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/product/${id}`);
  dispatch({
    type: ADD_TO_CART,
    payload: {
      product: data.data._id,
      name: data.data.name,
      price: data.data.price,
      image: data?.data?.images[0]?.url,
      stock: data.data.stock,
      quantity,
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// Remove To Cart
export const removeItemFromCart = (id) => async (dispatch, getState) => {
  dispatch({ type: REMOVE_TO_CART, payload: id });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// Save Shipping info
export const SaveShippingInfo = (data) => (dispatch) => {
  dispatch({ type: SAVE_SHIPPING_INFO, payload: data });
  localStorage.setItem("shippingInfo", JSON.stringify(data));
};
