import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProductDetails } from "../../actions/productAction";
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard.js";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import { addItemsToCart } from "../../actions/cartAction";
import { toast } from "react-hot-toast";

const ProductDetails = () => {
    const dispatch = useDispatch();
    const id = useParams();
    const { product, loading, error } = useSelector((state) => state.productDetails);

    useEffect(() => {
        dispatch(getProductDetails(id));
    }, [dispatch, id]);

    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "tomato",
        size: window.innerWidth < 600 ? 20 : 25,
        value: product.ratings,
        isHalf: true,
    };

    const [quantity, setQuantity] = useState(1);

    const decreaseQuantity = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const increaseQuantity = () => {
        if (product.Stock <= quantity) return;
        setQuantity(quantity + 1);
    };

    const addToCartHandler = () => {
        dispatch(addItemsToCart(id.id, quantity));
        toast.success("Item Added To Cart");
    };

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title={`${product.name} -- ECOMMERCE`} />
                    <div className="ProductDetails bg-gradient-to-br from-purple-500 to-blue-500 text-white p-6 ">
                        <div className="flex flex-col md:flex-row">
                            <div className="md:w-1/2">
                                {product.images &&
                                    product.images.map((item, i) => (
                                        <img
                                            key={item.url}
                                            src={item.url}
                                            alt={`${i} Slide`}
                                            className="w-auto h-auto object-cover rounded-lg mb-4"
                                        />
                                    ))}
                            </div>

                            <div className="md:w-1/2 md:pl-6 mt-10">
                                <div className="detailsBlock-1 mb-4">
                                    <h2 className="text-3xl font-bold">{product.name}</h2>
                                    <p className="text-sm">Product # {product._id}</p>
                                </div>
                                <div className="detailsBlock-2 mb-4 flex items-center">
                                    <ReactStars {...options} />
                                    <span className="ml-2">({product.numOfReviews})</span>
                                </div>
                                <div className="detailsBlock-3 mb-4">
                                    <h1 className="text-2xl font-semibold">{`Rs ${product.price}`}</h1>
                                    <div className="detailsBlock-3-1 flex items-center mt-4">
                                        <div className="detailsBlock-3-1-1 flex items-center border border-gray-300 rounded-lg overflow-hidden">
                                            <button onClick={decreaseQuantity} className="px-3 py-1 bg-gray-200 text-gray-700">-</button>
                                            <input
                                                type="number"
                                                value={quantity}
                                                readOnly
                                                className="w-full text-center border-none text-black"
                                            />
                                            <button onClick={increaseQuantity} className="px-3 py-1 bg-gray-200 text-gray-700">+</button>
                                        </div>
                                        <button onClick={addToCartHandler} className="ml-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300">Add to Cart</button>
                                    </div>

                                    <p className="mt-4">
                                        Status:{" "}
                                        <b className={product.Stock < 1 ? "text-red-500" : "text-green-500"}>
                                            {product.Stock < 1 ? "OutOfStock" : "InStock"}
                                        </b>
                                    </p>
                                </div>

                                <div className="detailsBlock-4 mb-4">
                                    Description: <p>{product.description}</p>
                                </div>
                                <button className="submitReview px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-300">Submit Review</button>
                            </div>
                        </div>

                        <h3 className="reviewsHeading text-xl font-bold mt-8">REVIEWS</h3>
                        {product.reviews && product.reviews[0] ? (
                            <div className="reviews mt-4 grid grid-cols-1 gap-y-4">
                                {product.reviews.map((review) => (
                                    <ReviewCard key={review._id} review={review} />
                                ))}
                            </div>
                        ) : (
                            <p className="noReviews mt-4">No Reviews Yet</p>
                        )}
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default ProductDetails;
