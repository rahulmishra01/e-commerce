import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productDetailsReducer,
  productReducer,
} from "./reducer/productReducer";
import { userReducer, updateProfileReducer } from "./reducer/userReducer";
import { forgotreducer } from "./reducer/forgotPasswordReducer";
import { cartReducer } from "./reducer/cartReducer";
import { neworderReducer } from "./reducer/orderReducer";
const reducer = combineReducers({
  products: productReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  profile: updateProfileReducer,
  forgot: forgotreducer,
  cart: cartReducer,
  newOrder: neworderReducer,
});

let initState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
