import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Orders = () => {
    const { user } = useSelector((state) => state.user);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`https://e-commerce-backend-2-gck1.onrender.com/api/v1/orders/me?userId=${user?._id}`);
                setOrders(response.data.orders);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };

        fetchOrders();
    }, [user]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 p-6 flex flex-col items-center">
            <h1 className="text-4xl font-bold mb-6 text-white">My Orders</h1>
            {orders.length === 0 ? (
                <p className="text-lg text-gray-200">No orders found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
                    {orders.map((order) => (
                        <div key={order._id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                            <h2 className="text-xl font-semibold mb-2 text-gray-700">Order ID: {order._id}</h2>
                            <p className="text-gray-600 mb-1">Total Price: Rs. {order.totalPrice.toFixed(2)}</p>
                            <p className={`mb-3 ${order.orderStatus === 'Delivered' ? 'text-green-600' : 'text-yellow-600'}`}>
                                Status: {order.orderStatus}
                            </p>
                            <Link to={`/order/${order._id}`} className="text-blue-500 hover:underline">
                                View Details
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Orders;
