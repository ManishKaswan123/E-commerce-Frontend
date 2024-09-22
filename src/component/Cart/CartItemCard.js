import React from "react";
import './CartItemCard.css';
import { Link } from "react-router-dom";
import { useDispatch} from "react-redux";
import { toast } from "react-hot-toast";
import { removeItemFromCart } from "../../actions/cartAction";

const CartItemCard = ({item}) => {
    const dispatch = useDispatch();

    const handleClick = (id) => {
        dispatch(removeItemFromCart(id));
        toast.success("Item Removed from Cart");
    }
    
    return (
        <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-md">
            <img 
                src={item.image} 
                alt={item.name} 
                className="w-16 h-22 object-cover rounded" 
                style={{ objectPosition: 'bottom' }}
            />
            <div className="flex-1">
                <Link to={`/product/${item.product}`} className="text-lg font-semibold text-blue-600 hover:underline">
                    {item.name}
                </Link>
                <div className="text-gray-600 mt-1">
                    <span>{`Price: Rs. ${item.price}`}</span>
                </div>
                <button
                    onClick={() => handleClick(item.product)}
                    className="mt-2 text-red-500 hover:text-red-700 transition duration-300"
                >
                    Remove
                </button>
            </div>
        </div>
    )
};

export default CartItemCard;