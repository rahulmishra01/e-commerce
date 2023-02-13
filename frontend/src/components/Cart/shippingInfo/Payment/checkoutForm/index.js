import React from "react";
import { ElementsConsumer, CardElement } from "@stripe/react-stripe-js";

import CardSection from "../cardSection";
import { useSelector } from "react-redux";

const CheckoutForm = () => {
  const { cartItems } = useSelector((state) => state.cart);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { stripe, elements } = this.props;
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    const result = await stripe.createToken(card);
    if (result.error) {
      console.log(result.error.message);
    } else {
      console.log(result.token);
    }
  };

  return (
    <div>
      <div class="product-info">
        {cartItems &&
          cartItems.map((item, index) => (
            <div key={index}>
              <h3 className="product-title">{item.name}</h3>
              <h4 className="product-price">${item.price}</h4>
            </div>
          ))}
      </div>
      <form onSubmit={handleSubmit}>
        <CardSection />
        <button className="btn-pay">Buy Now</button>
      </form>
    </div>
  );
};

export default function InjectedCheckoutForm() {
  return (
    <ElementsConsumer>
      {({ stripe, elements }) => (
        <CheckoutForm stripe={stripe} elements={elements} />
      )}
    </ElementsConsumer>
  );
}
