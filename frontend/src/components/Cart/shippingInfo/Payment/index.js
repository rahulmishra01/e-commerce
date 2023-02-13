import React, { Fragment } from "react";
import CheckoutStep from "../CheckoutStep";
// import { useDispatch, useSelector } from "react-redux";
import MetaData from "../../../layout/MetaData";
// import { Typography } from "@material-ui/core";
// import { useAlert } from "react-alert";
// import {
//   CardNumberElement,
//   CardCvcElement,
//   CardExpiryElement,
//   useStripe,
//   useElements,
// } from "@stripe/react-stripe-js";
// import axios from "axios";
import "./payment.css";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./checkoutForm";
// import { AiFillCreditCard } from "react-icons/ai";
// import { BiCalendarEvent } from "react-icons/bi";
// import { MdVpnKey } from "react-icons/md";

const stripePromise = loadStripe("pk_test_35p114pH8oNuHX72SmrvsFqh00Azv3ZaIA");

const Index = () => {
  // const dispatch = useDispatch();
  // const alert = useAlert();

  // const submitHandler = () => {
  //   console.log("submit");
  // };

  // const orderInfo = JSON.parse(sessionStorage.getItem("orderinfo"));

  // const payBtn = useRef(null);

  return (
    <Fragment>
      <MetaData title="Payment process" />
      <CheckoutStep activeStep={2} />
      <div className="paymentContainer">
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
        {/*<form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
          <Typography>Card Info</Typography>
          <div>
            <AiFillCreditCard />
          </div>
          <div>
            <BiCalendarEvent />
          </div>
          <div>
            <MdVpnKey />
          </div>

          <input
            type="submit"
            value={`pay - ${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
            className="PaymentFromBtn"
          />
  </form>*/}
      </div>
    </Fragment>
  );
};

export default Index;
