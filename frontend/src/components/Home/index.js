import React, { Fragment, useEffect } from "react";
import { SiAcclaim } from "react-icons/si";
import "./home.css";
import Product from "./Product";
import MetaData from "../layout/MetaData";
import { clearErrors, getProduct } from "../../redux/action/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/loader";
import { useAlert } from "react-alert";

const Index = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => {
    return state.products;
  });

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="ECOMMERCE" />
          <div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>
            <a href="#container">
              <button>
                scroll
                <SiAcclaim />
              </button>
            </a>
          </div>

          <h2 className="homeHeading">Featured Products</h2>
          <div className="container" id="container">
            {products &&
              products.map((product, index) => (
                <Product product={product} key={index} />
              ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Index;
