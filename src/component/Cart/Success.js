import React, { Fragment, useEffect } from "react";
import toast from "react-hot-toast";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import "./Success.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const Success = () => {
    const data = JSON.parse(localStorage.getItem("Order"));
    console.log("Order is :-", data);
    return (
        <div className="orderSuccess">
            <CheckCircleIcon />
            <Typography>Your Order has been Placed Successfully</Typography>
            <Link to="/order/me">View Orders</Link>
        </div>
    )
};

export default Success;