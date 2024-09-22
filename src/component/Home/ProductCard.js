import React from 'react';
import { Link } from 'react-router-dom';
import ReactStars from "react-rating-stars-component";

const ProductCard = ({ product }) => {
    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "tomato",
        size: window.innerWidth < 600 ? 20 : 25,
        value: product.ratings,
        isHalf: true
    };

    return (
        <Link to={`/product/${product._id}`} className="w-full rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 m-3">
            <img
                className="w-full h-56 object-top object-cover"
                src={product?.images[0]?.url}
                alt={product?.name}
            />
            <div className="p-4 bg-gradient-to-br from-purple-600 to-white">
                <h2 className="text-xl font-semibold text-gray-800">{product?.name}</h2>
                <p className="text-gray-600 mt-2">{product?.description}</p>
                <div className="flex justify-between items-center mt-4">
                    <span className="text-lg font-bold text-blue-600">Rs. {product?.price}</span>
                    <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-800 transition duration-300">
                        Add to Cart
                    </button>
                </div>
                <div className="flex items-center mt-2">
                    <ReactStars {...options} />
                    <p className='ml-2 text-gray-600'>({product.numOfReviews} reviews)</p>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
