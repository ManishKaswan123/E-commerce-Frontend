import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemsToCart } from "../../actions/cartAction";
import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import { Link, useNavigate } from "react-router-dom";
import CartItemCard from "./CartItemCard.js";

const Cart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => state.cart);

    const increaseQuantity = (id, quantity, stock) => {
        const newQty = quantity + 1;
        if (stock <= quantity) return;
        dispatch(addItemsToCart(id, newQty));
    };

    const decreaseQuantity = (id, quantity) => {
        const newQty = quantity - 1;
        if (1 >= quantity) return;
        dispatch(addItemsToCart(id, newQty));
    };

    const checkoutHandler = () => {
        navigate(`/shipping`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 text-white">
            <Fragment>
                {cartItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                        <RemoveShoppingCartIcon className="text-6xl text-gray-500 mb-4 animate-bounce" />
                        <Typography variant="h5" className="mb-4">No Product In Your Cart</Typography>
                        <Link to="/products" className="text-blue-300 hover:underline">View Products</Link>
                    </div>
                ) : (
                    <Fragment>
                        <div className="container mx-auto p-6">
                            <div className="hidden md:flex justify-between items-center mb-4 font-semibold">
                                <p className="w-1/3 text-center">Product</p>
                                <p className="w-1/3 text-center">Quantity</p>
                                <p className="w-1/3 text-center">Subtotal</p>
                            </div>
                            {cartItems.map((item) => (
                                <div key={item.product} className="flex flex-col md:flex-row items-center justify-between bg-white text-black p-4 mb-4 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105">
                                    <div className="w-full md:w-1/3 flex justify-center">
                                        <CartItemCard item={item} />
                                    </div>
                                    <div className="w-full md:w-1/3 flex justify-center items-center mt-2 md:mt-0">
                                        <button onClick={() => decreaseQuantity(item.product, item.quantity)} className="px-3 py-1 bg-gray-200 text-gray-700 rounded-l">-</button>
                                        <input
                                            type="number"
                                            value={item.quantity}
                                            readOnly
                                            className="w-12 text-center border-t border-b border-gray-200"
                                        />
                                        <button onClick={() => increaseQuantity(item.product, item.quantity, item.stock)} className="px-3 py-1 bg-gray-200 text-gray-700 rounded-r">+</button>
                                    </div>
                                    <p className="w-full md:w-1/3 text-center mt-2 md:mt-0">{`Rs. ${item.price * item.quantity}`}</p>
                                </div>
                            ))}
                            <div className="flex flex-col items-end mt-8">
                                <div className="flex justify-between w-full md:w-auto mb-4 font-semibold">
                                    <p>Gross Total</p>
                                    <p>{`Rs. ${cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)}`}</p>
                                </div>
                                <button onClick={checkoutHandler} className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 transform hover:scale-105">Check Out</button>
                            </div>
                        </div>
                    </Fragment>
                )}
            </Fragment>
        </div>
    );
};

export default Cart;
