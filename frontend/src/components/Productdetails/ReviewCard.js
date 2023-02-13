import React from "react";
import ReactStars from "react-rating-stars-component";
import Profile from "../../images/Profile.png";

const ReviewCard = ({ product }) => {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.rating,
    isHalf: true,
  };

  return (
    <div className="reviewCard">
      <img src={Profile} alt="User" />
      <p>{product.name}</p>
      <ReactStars {...options} />
      <span>{product.comment}</span>
    </div>
  );
};

export default ReviewCard;
