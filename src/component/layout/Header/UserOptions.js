import React, { Fragment, useState } from "react";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import { Backdrop } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../actions/userAction";
import { toast } from "react-hot-toast";
import { FaShoppingCart, FaUserAlt, FaSignOutAlt, FaListAlt, FaTachometerAlt } from "react-icons/fa"; // Importing icons from react-icons for consistency

const UserOptions = ({ user }) => {
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const options = [
    { icon: <FaListAlt />, name: "Orders", func: orders },
    { icon: <FaUserAlt />, name: "Profile", func: account },
    { icon: <FaShoppingCart className={`text-${cartItems.length > 0 ? "red-500" : "white"}`} />, name: `Cart (${cartItems.length})`, func: cart },
    { icon: <FaSignOutAlt />, name: "Logout", func: LogoutUser },
  ];

  if (user && user.role === "admin") {
    options.unshift({
      icon: <FaTachometerAlt />,
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
    toast.success("Logged out successfully");
    dispatch(logout());
  }

  return (
    <Fragment>
      <Backdrop open={open} />
      <SpeedDial
        ariaLabel="User Options"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        direction="down"
        className="fixed bottom-4 right-4 z-50"
        icon={
          <img
            className="w-10 h-10 rounded-full border-2 border-white"
            src={user && user.avatar && user.avatar.url ? user.avatar.url : "/Profile.png"}
            alt="Profile"
          />
        }
        FabProps={{
          style: {
            backgroundColor: 'linear-gradient(to right, #6b46c1, #4299e1)', // Matching header gradient
            color: 'white',
          },
        }}
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth < 600}
            className="text-white hover:text-yellow-400 transition"
            tooltipPlacement="right"
          />
        ))}
      </SpeedDial>
    </Fragment>
  );
};

export default UserOptions;
