// import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";

const ProtetRoute = ({ children, ...rest }) => {
  const navigate = useNavigate();
  const { loading, isAuthincated } = useSelector((state) => state.user);
  if (!isAuthincated) {
    return navigate("/login");
  }else{
    return  children;
  }
};

export default ProtetRoute;
