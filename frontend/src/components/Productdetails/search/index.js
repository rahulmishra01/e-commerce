import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./search.css";
import Products from "../products";

const Index = () => {
  const [keyword, setKeyword] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [data, setData] = useState(false);
  const navigate = useNavigate();
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }
  };

  return (
    <Fragment>
      <form className="searchBox" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="search a product..."
          onChange={(e) => setKeyword(e.target.value.toLowerCase())}
        />
        <input type="submit" value="Search" />
      </form>
      {
        data && <Products keyword={keyword}/>
      }
    </Fragment>
  );
};

export default Index;
