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
import Success from "./component/Cart/Success.js";
import Orders from "./component/Cart/Orders.js";

function App() {
    return (
        <Router>
            <Toaster />
            <Header/>
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
                <Route exact path="/orders" element={<Orders />} />
                <Route exact path="/success" element={<Success />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
