import React, { Fragment } from "react";
import './Cart.css';
import CartItemCard from "./CartItemCard.js";
import { useDispatch, useSelector } from "react-redux";
import { addItemsToCart } from "../../actions/cartAction";
import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import { Link, useNavigate } from "react-router-dom";


const Cart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {cartItems} = useSelector((state) => state. cart);

    const increaseQuantity = (id , quantity , stock) => {
        const newQty = quantity + 1;
        if(stock <= quantity) 
            return;
        dispatch(addItemsToCart(id , newQty));
    }

    const decreaseQuantity = (id , quantity) => {
        const newQty = quantity - 1;
        if(1 >= quantity) 
            return;
        dispatch(addItemsToCart(id , newQty));
    }

    const checkoutHandler = () => {
        navigate(`/login?redirect=shipping`);
    }
    return (
        <Fragment>
            
            {cartItems.length === 0 ? 
                (
                    <div className="emptyCart">
                        <RemoveShoppingCartIcon />
                        <Typography>No Product In Your Cart</Typography>
                        <Link to = {`/products`}>View Products</Link>
                    </div>
                ) : 
                (
                    <Fragment>
                        <div className="cartPage">
                            <div className="cartHeader">
                                <p>Product</p>
                                <p>Quantity</p>
                                <p>Subtotal</p>
                            </div>
                            {cartItems && cartItems.map((item) => (
                                <div className="cartContainer" key={item.product}>
                                    <CartItemCard item={item} />
                                    <div className="cardInput">
                                        <button onClick={() => decreaseQuantity(item.product , item.quantity)}>-</button>
                                        <input 
                                            // type="number" 
                                            value={item.quantity} 
                                            readOnly
                                        />
                                        <button onClick={() => increaseQuantity(item.product , item.quantity , item.stock)}>+</button>
                                    </div>
                                    <p className="cartsubtotal">
                                        {`Rs. ${item.price * item.quantity}`}
                                    </p>
                                </div>
                            ))}
                            <div className="cartGrossTotal">
                                <div className="cartGrossTotalBox">
                                    <p>Gross Total</p>
                                    <p>{`Rs. ${cartItems.reduce((acc , item) => acc + item.price * item.quantity , 0)}`}</p>
                                </div>
                                <div className="checkOutBtn">
                                    <button onClick={checkoutHandler}>Check Out</button>
                                </div>
                            </div>
                        </div>
                        
                    </Fragment>
                )
            }
        </Fragment>
    )
};

export default Cart;