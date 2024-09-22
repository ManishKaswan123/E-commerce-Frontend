import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import CheckoutSteps from "./CheckoutSteps";
import { Typography } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const ConfirmOrder = () => {
    const navigate = useNavigate();
    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);
    
    const subTotal = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    const shippingCharges = subTotal > 1000 ? 0 : 200;
    const tax = subTotal * 0.18;
    const totalPrice = subTotal + shippingCharges + tax;
    const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

    const proceedToPayment = async () => {
        const data = {
            shippingInfo,
            orderItems: cartItems,
            paymentInfo: {
                id: "samplePaymentId", // Replace with actual payment ID if applicable
                status: "Paid"
            },
            itemsPrice: subTotal,
            taxPrice: tax,
            shippingPrice: shippingCharges,
            totalPrice ,
            user: user?._id
        };
    
        try {
            const response = await axios.post("https://e-commerce-backend-2-gck1.onrender.com/api/v1/order/new", data); // Adjust the URL as needed
            if (response.data.success) {
                navigate("/orders"); // Redirect to the orders page after successful order creation
            }
        } catch (error) {
            console.error("Error creating order:", error);
        }
    };
    return (
        <Fragment>
            <MetaData title="Confirm Order" />
            <CheckoutSteps activeStep={1} />
            <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 p-6 flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                        <Typography variant="h5" className="font-bold mb-4 text-gray-800">Shipping Info</Typography>
                        <div className="space-y-2 text-gray-700">
                            <div className="flex justify-between">
                                <p className="font-semibold">Name:</p>
                                <span>{user.name}</span>
                            </div>
                            <div className="flex justify-between">
                                <p className="font-semibold">Phone:</p>
                                <span>{shippingInfo.phoneNo}</span>
                            </div>
                            <div className="flex justify-between">
                                <p className="font-semibold">Address:</p>
                                <span>{address}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                        <Typography variant="h5" className="font-bold mb-4 text-gray-800">Your Cart Items</Typography>
                        <div className="space-y-4 text-gray-700">
                            {cartItems.map((item) => (
                                <div key={item.product} className="flex items-center space-x-4">
                                    <img src={item.image} alt={item.name} className="w-16 h-22 object-cover rounded" />
                                    <Link to={`/product/${item.product}`} className="text-blue-600 hover:underline flex-1">{item.name}</Link>
                                    <span>{item.quantity} X Rs.{item.price} = Rs.{item.price * item.quantity}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Order Summary spans both columns on small screens */}
                    <div className="bg-gray-100 p-6 rounded-lg shadow-md md:col-span-2">
                        <Typography variant="h5" className="font-bold mb-4 text-gray-800">Order Summary</Typography>
                        <div className="space-y-2 text-gray-700">
                            <div className="flex justify-between">
                                <p>SubTotal:</p>
                                <span>Rs. {subTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <p>Shipping Charges:</p>
                                <span>Rs. {shippingCharges.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <p>GST:</p>
                                <span>Rs. {tax.toFixed(2)}</span>
                            </div>
                        </div>
                        <div className="flex justify-between font-bold mt-4 border-t pt-2 text-gray-800">
                            <p>Total:</p>
                            <span>Rs. {totalPrice.toFixed(2)}</span>
                        </div>
                        <button onClick={proceedToPayment} className="w-full mt-6 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300">Proceed To Payment</button>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default ConfirmOrder;
