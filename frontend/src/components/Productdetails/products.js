import React, { Fragment, useEffect, useState } from "react";
import "./products.css";
import { useDispatch, useSelector } from "react-redux";
// eslint-disable-next-line no-unused-vars
import { clearErrors, getProduct } from "../../redux/action/productAction";
import Loader from "../layout/Loader/loader";
import Product from "../Home/Product";
// import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
const Products = ({ keyword }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const { products, loading, error, productsConunt, resultPerPage } =
    useSelector((state) => state.products);

  //   const keyword = useParams();

  useEffect(() => {
    dispatch(getProduct(keyword, currentPage));
  }, [dispatch, keyword, currentPage]);

  const filterSearch = !keyword
    ? products
    : products.filter((item) =>
        item.name.toLowerCase().includes(keyword.toLowerCase())
      );

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <h2 className="productsHeading">Products</h2>
          <div className="products">
            {filterSearch.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
          <div className="paginationBox"></div>
          {resultPerPage < productsConunt && (
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={resultPerPage}
              totalItemsCount={productsConunt}
              onChange={setCurrentPageNo}
              nextPageText="Next"
              prevPageText="Prev"
              firstPageText="1st"
              lastPageText="Last"
              itemClass="page-item"
              linkClass="page-link"
              activeClass="pageItemActive"
              activeLinkClass="pageLinkActive"
            />
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
