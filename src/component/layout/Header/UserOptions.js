import React, { Fragment, useState } from "react";
import "./Header.css";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import DashboardIcon from "@material-ui/icons/Dashboard";
import Backdrop from "@material-ui/core/Backdrop";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import { useNavigate } from "react-router-dom";
import { useDispatch , useSelector } from "react-redux";
import { logout } from "../../../actions/userAction";
import { toast } from "react-hot-toast";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Tooltip } from "@material-ui/core";

const UserOptions = ({ user }) => {
  const {cartItems} = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const options = [
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <PersonIcon />, name: "Profile", func: account },
    { icon: <ShoppingCartIcon style={{color: cartItems.length > 0 ? "tomato" : "unset"}}/>, name: `Cart(${cartItems.length})`, func: cart },
    { icon: <ExitToAppIcon />, name: "Logout", func: LogoutUser },
  ];

  if (user && user.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  function dashboard() {
    navigate("/dashboard");
  }

  function orders() {
    navigate(`/orders/${user._id}`);
  }

  function account() {
    navigate(`/account/${user._id}`);
  }

  function cart() {
    navigate(`/cart`);
  }

  function LogoutUser() {
    toast.success("You logged out successfully");
    console.log("Logged Out");
    dispatch(logout());
  }

  return (
    <Fragment>
      <Backdrop open={open} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        direction="down"
        className="speedDial"
        icon={
          <img
            className="speedDialIcon"
            src={user && user.avatar && user.avatar.url ? user.avatar.url : "/Profile.png"}
            alt="Profile"
          />
        }
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth < 600 ? true : false}
            tooltipPlacement="right"
          />
        ))}
      </SpeedDial>
    </Fragment>
  );
};

export default UserOptions;
