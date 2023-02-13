import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  getProductDetails,
} from "../../redux/action/productAction";
import ReactStars from "react-rating-stars-component";
import { useLocation, useParams } from "react-router-dom";
import "./product.css";
import ReviewCard from "./ReviewCard";
import { useAlert } from "react-alert";
import Loader from "../layout/Loader/loader";
import { addItemsToCart } from "../../redux/action/cartAction";

const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);

  const location = useLocation();
  const alert = useAlert();
  const dispatch = useDispatch();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProductDetails(id));
  }, [id, error, dispatch, alert]);

  const options = {
    // value: product.ratings,
    value: location.state.ratings,
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    isHalf: true,
  };
  // const [options, setOptions] = useState(true);

  // useEffect(() => {
  //   setOptions({
  //     value: product.ratings,
  //     // value: location.state.ratings,
  //     edit: false,
  //     color: "rgba(20,20,20,0.1)",
  //     activeColor: "tomato",
  //     size: window.innerWidth < 600 ? 20 : 25,
  //     isHalf: true,
  //   });
  // }, [product]);
  // console.log(location, "locationlocationlocationlocation");

  // increase function
  const increaseQuantity = () => {
    if (product.stock <= quantity) {
      return;
    }

    const qty = quantity + 1;
    setQuantity(qty);
  };

  // decrease function

  const decreaseQuantity = () => {
    if (1 >= quantity) {
      return;
    }
    const qty = quantity - 1;
    setQuantity(qty);
  };

  // add to cart

  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));
    alert.success("This Item Added To Cart");
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="ProductDetails">
            <div>
              <Carousel>
                {product.images &&
                  product.images?.map((item, i) => {
                    return (
                      <div key={i}>
                        <img
                          className="CarouselImage"
                          src={item.url}
                          alt={`${i} Slide`}
                          key={item.url}
                        />
                      </div>
                    );
                  })}
              </Carousel>
            </div>

            <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product #{product._id}</p>
              </div>

              <div className="detailsBlock-2">
                <ReactStars {...options} />
                <span>({product.numofReviews} Reviews)</span>
              </div>

              <div className="detailsBlock-3">
                <h1>{`₹${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <h1>{`₹${product.price}`}</h1>
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input type="number" value={quantity} readOnly />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button onClick={addToCartHandler}>Add to Cart</button>
                </div>
                <p>
                  Status :-
                  <b
                    className={product.stock < 1 ? "redColor" : "greenColor"}
                  ></b>
                  {product.stock < 1 ? "outOfStock" : "InStock"}
                </p>
              </div>

              <div className="detailsBlock-4">
                Description:-<p>{product.description} </p>
              </div>
              <button className="submitReview">Submit Review</button>
            </div>
          </div>

          <h3 className="reviewsHeading">Reviews</h3>
          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((product, index) => (
                  <ReviewCard product={product} key={index} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetail;
