import React, { Fragment, useState } from "react";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import "./header.css";
import { MdDashboard } from "react-icons/md";
import { BsCartCheckFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { GiBorderedShield } from "react-icons/gi";
import { MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Logout } from "../../../redux/action/userAction";

const UserOptions = ({ user }) => {
  const [open, setOpen] = useState(false);
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const alert = useAlert();

  const navigate = useNavigate();

  const options = [
    { icon: <GiBorderedShield />, name: "Order", func: orders },
    {
      icon: (
        <BsCartCheckFill
          style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}
        />
      ),
      name: `Cart(${cartItems.length})`,
      func: cart,
    },
    { icon: <CgProfile />, name: "Profile", func: account },
    { icon: <MdLogout />, name: "Loogout", func: logoutUser },
  ];

  if (user.role === "admin") {
    options.unshift({
      icon: <MdDashboard />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  function dashboard() {
    navigate("/dashboard");
  }
  function orders() {
    navigate("/orders");
  }
  function account() {
    navigate("/account");
  }
  function cart() {
    navigate("/cart");
  }
  function logoutUser() {
    dispatch(Logout())
      .then((result) => {
        navigate("/login");
      })
      .catch((err) => {
        console.log("err", err);
      });

    alert.success("logout successfully");
  }

  return (
    <Fragment>
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        style={{ zIndex: "11" }}
        open={open}
        direction="down"
        className="speedDial"
        icon={
          <img
            className="speedDialIcon"
            src={user.avatar.url ? user.avatar.url : "/Profile.png"}
            alt="profile"
          />
        }
      >
        {options.map((item, index) => (
          <SpeedDialAction
            key={index}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}
      </SpeedDial>
    </Fragment>
  );
};

export default UserOptions;
