import React, { Fragment } from "react";
import './ConfirmOrder.css';
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import CheckoutSteps from "./CheckoutSteps";
import { Typography } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";


const ConfirmOrder = () => {
    const navigate = useNavigate();
    const {shippingInfo , cartItems} = useSelector((state) => state.cart);
    const {user} = useSelector((state) => state.user);

    console.log("CartItems ", cartItems);
    const subTotal = cartItems.reduce(
        (acc , item) => acc + item.price * item.quantity , 
        0
    );

    const shippingCharges = subTotal > 1000 ? 0 : 200;
    const tax = subTotal * 0.18;
    const totalPrice = subTotal + shippingCharges + tax;
    const address = `${shippingInfo.address} , ${shippingInfo.city} , ${shippingInfo.state} , ${shippingInfo.pinCode} , ${shippingInfo.country}`;

    const proceedToPayment = () => {
        const data = {
            subTotal ,
            shippingCharges ,
            tax ,
            totalPrice
        };

        sessionStorage.setItem("orderInfo" , JSON.stringify(data));
        console.log("Confirm Order me orderInfo" , sessionStorage.getItem("orderInfo" , JSON.parse(sessionStorage.getItem("orderInfo"))));
        navigate(`/process/payment`);
    };

    return (
        <Fragment>
            <MetaData title="Confirm Order" />
            <CheckoutSteps activeStep={1} />
            <div className="confirmOrderPage">
                <div>
                    <div className="confirmShippingArea">
                        <Typography>Shipping Info</Typography>
                        <div className="confirmShippingAreaBox">
                            <div>
                                <p>Name:</p>
                                <span>{user.name}</span>
                            </div>
                            <div>
                                <p>Phone:</p>
                                <span>{shippingInfo.phoneNo}</span>
                            </div>
                            <div>
                                <p>Address:</p>
                                <span>{address}</span>
                            </div>
                        </div>
                    </div>
                    <div className="confirmCartItems">
                        <Typography>Your Cart Items:</Typography>
                        <div className="confirmCartItemsContainer">
                            {cartItems &&
                                cartItems.map((item) => (
                                    <div key={item.product}>
                                        <img src={item.image} alt="Product" />
                                        <Link to={`/product/${item.product}`}>
                                            {item.name}
                                        </Link>
                                        <span>
                                            {item.quantity} X Rs.{item.price} = {""}
                                            <b>Rs. {item.price * item.quantity}</b>
                                        </span>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div>
                    <div className="orderSummary">
                        <Typography>Order Summary</Typography>
                        <div>
                            <div>
                                <p>SubTotal:</p>
                                <span>Rs. {subTotal}</span>
                            </div>
                            <div>
                                <p>Shipping Charges:</p>
                                <span>Rs. {shippingCharges}</span>
                            </div>
                            <div>
                                <p>GST:</p>
                                <span>Rs. {tax}</span>
                            </div>
                        </div>
                        <div className="orderSummaryTotal">
                            <p>
                                <b>Total:</b>
                            </p>
                            <span>Rs. {totalPrice}</span>
                        </div>
                        <button onClick={proceedToPayment}>Proceed To Payment</button>
                    </div>
                </div>
            </div>

        </Fragment>
    )
}

export default ConfirmOrder;