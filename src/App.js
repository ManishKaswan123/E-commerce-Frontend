import React, { useState, useEffect } from "react";
import Header from "./component/layout/Header/Header.js";
import Footer from "./component/layout/Footer/Footer.js";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import WebFont from "webfontloader";
import Home from "./component/Home/Home.js";
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products";
import Search from "./component/Product/Search.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import LoginSignUp from "./component/User/LoginSignUp.js";
import Profile from "./component/User/Profile.js";
import UpdateProfile from "./component/User/UpdateProflile.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import toast, { Toaster } from 'react-hot-toast'; // Import the Toaster component
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Cart/Shipping.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import {
    PaymentElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import Success from "./component/Cart/Success.js";
import { clearErrors, createOrder } from "./actions/orderAction.js";

const CheckoutForm = () => {
    const stripe = useStripe();
    const currentUrl = window.location.href;
    const urlParams = new URLSearchParams(currentUrl);

    let paymentIntent = null;
    const redirectStatus = urlParams.get('redirect_status');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const elements = useElements();
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
    const [errorMessage, setErrorMessage] = useState(null);
    
    const {user} = useSelector((state) => state.user);
    const {error} = useSelector((state) => state.newOrder);
    const {shippingInfo , cartItems} = useSelector((state) => state.cart);

    const order = {
        user: user._id,
        shippingInfo ,
        orderItems: cartItems ,
        itemsPrice: orderInfo.subTotal ,
        taxPrice: orderInfo.tax , 
        shippingPrice: orderInfo.shippingCharges ,
        totalPrice: orderInfo.totalPrice
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (elements == null || stripe == null) {
            return;
        }

        const {error: submitError} = await elements.submit();
        if (submitError) {
            setErrorMessage(submitError.message);
            return;
        }

        const paymentData = {
            amount: Math.round(orderInfo.totalPrice * 100),
            description: "Your transaction description here",
            name: user?.name ,
            email: user?.email ,
            address: {
                line1: shippingInfo.address,
                city: shippingInfo.city,
                postal_code: shippingInfo.pinCode,
                country: shippingInfo.country,
                state: shippingInfo.state
            }
        };

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        try {
            const { data } = await axios.post(
                "http://localhost:4000/api/v1/payment/process",
                paymentData,
                config
            );

            const clientSecret = data.client_secret;

            const {error} = await stripe.confirmPayment({
                elements,
                clientSecret,
                confirmParams: {
                  return_url: 'http://localhost:3000/process/payment',
                },
              });

              console.log("error is this:-",error.message);
            if (error) {
                console.log(error.message);
                setErrorMessage(error.message);
                toast.error(error.message);
            } else {
                console.log("Check After ConfirmPayment");
                toast.success("Payment Successfull");
                navigate('/success');
            }
        } catch (err) {
            toast.error(err.message);
            setErrorMessage('An error occurred. Please try again.');
        }
    };

    useEffect(() => {
        if(error) {
            toast.error(error);
            dispatch(clearErrors())
        }
        if (redirectStatus === 'succeeded') {
            const queryString = currentUrl.split('?')[1];
            const parameters = queryString.split('&');
            parameters.forEach(param => {
                const [key, value] = param.split('=');
                if (key === 'payment_intent') {
                    paymentIntent = decodeURIComponent(value);
                } 
            });
            order.paymentInfo = {
                id: paymentIntent ,
                status: redirectStatus
            }
            toast.success("Payment Successfull");
            dispatch(createOrder(order));
            localStorage.setItem("Order" , JSON.stringify(order));
            navigate('/success');
        }
    } , [dispatch , toast , error]);

    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement />
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <button type="submit" disabled={!stripe || !elements} style={{padding: '0.8rem 2rem', marginTop: '2vmax', backgroundColor: 'tomato' , color: 'white'}}>
                    {`Pay - ₹${orderInfo && orderInfo.totalPrice} `}
                </button>
            </div>
        </form>
    );
};

const options = {
    mode: 'payment',
    amount: 1099,
    currency: 'usd',
    // Fully customizable with appearance API.
    appearance: {
        /*...*/
    },
};

function App() {
    const [stripeApiKey , setStripeApiKey] = useState("");

    useEffect(() => {
        async function getStripeApiKey() {
            try {
                const {data} = await axios.get('http://localhost:4000/api/v1/stripeapikey');
                setStripeApiKey(data.stripeApiKey);
            } catch (error) {
                console.error('Error occurred:', error);
            }
        }

        getStripeApiKey();

        WebFont.load({
            google: {
                families: ["Roboto", "Droid Sans", "Chilanka"]
            }
        });
    }, []);

    const logo = <img
        src="https://static.vecteezy.com/system/resources/previews/006/547/170/original/creative-modern-abstract-ecommerce-logo-design-colorful-gradient-online-shopping-bag-logo-design-template-free-vector.jpg"
        alt="Your Logo"
        height="60"
        style={{ background: 'transparent', marginLeft: '2rem'}}
    />;

    return (
        <Router>
            <Toaster />
            <Header logo={logo}/>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/product/:id" element={<ProductDetails />} />
                <Route exact path="/products" element={<Products />} />
                <Route path="/products/:keyword" element={<Products />} />
                <Route exact path="/search" element={<Search />} />
                <Route exact path="/account/:id" element={<Profile />} />
                <Route exact path="/me/update/:id" element={<UpdateProfile />} />
                <Route exact path="/password/update/:id" element={<UpdatePassword />} />
                <Route exact path="/password/forgot" element={<ForgotPassword />} />
                <Route exact path="/password/reset/:token" element={<ResetPassword />} />
                {/* <Route exact path="/login" component={LoginSignUp} /> */}
                <Route path="/login" element={<LoginSignUp />} />

                <Route exact path="/cart" element={<Cart />} />
                <Route exact path="/shipping" element={<Shipping />} />
                <Route exact path="/order/confirm" element={<ConfirmOrder />} />

                <Route path="/process/payment" element={
                    <div style={{ marginTop: '10vmax' }}>
                        <Elements stripe={loadStripe(stripeApiKey)} options={options} >
                            <CheckoutForm />
                        </Elements>
                    </div>
                } />
                <Route exact path="/success" element={<Success />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
