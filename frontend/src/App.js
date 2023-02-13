import "./App.css";
import Header from "./components/layout/Header/header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WebFont from "webfontloader";
import { useEffect, useState } from "react";
import Footer from "./components/layout/Footer/footer";
import Home from "./components/Home/index";
import ProductDetails from "./components/Productdetails/index";
import Products from "./components/Productdetails/products";
import Search from "./components/Productdetails/search";
import LoginSignUp from "./components/User/LoginSignup";
import Account from "./components/User/Account";
import UpdateProfile from "./components/User/Account/updateprofile";
import UpdatePassword from "./components/User/Account/updatePassword";
import store from "./redux/store";
import { Loaduser } from "./redux/action/userAction";
import UserOptions from "./components/layout/Header/UserOptions";
import { useSelector } from "react-redux";
import ForgotPassword from "./components/User/ForgotPassword";
import ResetPassword from "./components/User/ForgotPassword/ResetPassword/resetpassword";
import AddToCart from "./components/Cart";
import ShippingInfo from "./components/Cart/shippingInfo";
import ConfirmOrder from "./components/Cart/shippingInfo/confirmOrder";
// import ProtetRoute from "./components/ProtectRoute/index";
import Payment from "./components/Cart/shippingInfo/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
function App() {
  const { isAuthincated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(Loaduser());
    getStripeApiKey();
  }, []);

  return (
    <div className="App">
      <Router>
        <Header />
        {isAuthincated && <UserOptions user={user} />}
        <Routes>
          <Route extact path="/" element={<Home />} />
          <Route extact path="/product/:id" element={<ProductDetails />} />
          <Route extact path="/products" element={<Products />} />
          <Route path="/products/:keyword" element={<Products />} />
          <Route extact path="/search" element={<Search />} />
          <Route extact path="/login" element={<LoginSignUp />} />
          <Route extact path="/account" element={<Account />} />
          <Route extact path="/update" element={<UpdateProfile />} />
          <Route extact path="/password/update" element={<UpdatePassword />} />
          <Route extact path="/forgot" element={<ForgotPassword />} />
          <Route
            extact
            path="/password/reset/:token"
            element={<ResetPassword />}
          />
          <Route extact path="/cart" element={<AddToCart />} />
          <Route extact path="/shipping" element={<ShippingInfo />} />
          <Route extact path="/order/confirm" element={<ConfirmOrder />} />
          <Route
            extact
            path="/procees/payment"
            element={<Payment stripeApiKey={stripeApiKey} />}
          />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
// eslint-disable-next-line no-lone-blocks
{
  /*<ProtetRoute>*/
}
// eslint-disable-next-line no-lone-blocks
{
  /*</ProtetRoute>*/
}
