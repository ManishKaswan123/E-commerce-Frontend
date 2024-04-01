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
        <div className="cartItemCard">
            <img src={item.image} alt="ssa" />
            <div>
                <Link to={`/product/${item.product}`}>
                    {item.name}
                </Link>
                <span>
                    {`Price: ${item.price}`}
                </span>
                <p onClick={() => handleClick(item.product)}>Remove</p>
            </div>
        </div>
    )
};

export default CartItemCard;