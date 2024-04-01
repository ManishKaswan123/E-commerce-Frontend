import React , {Fragment, useEffect, useState} from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import {useSelector , useDispatch} from "react-redux";
import { getProductDetails } from "../../actions/productAction";
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard.js";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import {addItemsToCart} from "../../actions/cartAction";
import { toast } from "react-hot-toast";

const ProductDetails = () => {
    const dispatch = useDispatch();
    const id = useParams();
    console.log("id is :-", id.id);
    const {product , loading , error} = useSelector(
        (state) => state.productDetails
    );

    useEffect(() => {
        dispatch(getProductDetails(id))
    } , [dispatch , id]);

    console.log("productDetails ", product , " ", product.ratings);
    
    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "tomato",
        size: window.innerWidth < 600 ? 20 : 25,
        value: product.ratings,
        isHalf: true
    };

    const [quantity , setQuantity] = useState(1);

    const decreaseQuantity = () => {
        if(quantity > 1)
            setQuantity(quantity-1);
    }

    const increaseQuantity = () => {
        if(product.Stock <= quantity)
            return;
        setQuantity(quantity+1);
    }

    const addToCartHandler = () => {
        dispatch(addItemsToCart(id.id , quantity));
        toast.success("Item Added To Cart");
    }

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title = {`${product.name} -- ECOMMERCE`} />
                    <div className="ProductDetails">
                        <div>
                            {/* <Carousel> */}
                                {
                                    product.images &&
                                    product.images.map((item , i) => (
                                        <img
                                            className="CarouselImage"
                                            key={item.url}
                                            src={item.url}
                                            alt={`${i} Slide`}
                                        />
                                    ))
                                }
                            {/* </Carousel>  */}
                        </div>
        
                        <div>
                            <div className="detailsBlock-1">
                                <h2>{product.name}</h2>
                                <p>Product # {product._id}</p>
                            </div>
                            <div className="detailsBlock-2">
                                <ReactStars {...options} />
                                <span> ({product.numOfReviews}) </span>
                            </div>
                            <div className="detailsBlock-3">
                                <h1>{`Rs ${product.price}`}</h1>
                                <div className="detailsBlock-3-1">
                                    <div className="detailsBlock-3-1-1">
                                        <button onClick={decreaseQuantity}>-</button>
                                        <input 
                                            type="Number" 
                                            value={quantity} 
                                            readOnly
                                        />
                                        <button onClick={increaseQuantity}>+</button>
                                    </div>{" "}
                                    <button onClick={addToCartHandler}> Add to Cart </button>
                                </div>
        
                                <p>
                                    Status: {" "}
                                    <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                                        {product.Stock < 1 ? "OutOfStock" : "InStock"}
                                    </b>
                                </p>
                            </div>
                            
                            <div className="detailsBlock-4">
                                Description: <p>{product.description}</p>
                            </div>
                            <button className="submitReview"> Submit Review </button>
                        </div>
                    </div>
                    <h3 className="reviewsHeading">
                        REVIEWS
                    </h3>
                    {product.reviews && product.reviews[0] ? (
                        <div className="reviews">
                            {product.reviews &&
                            product.reviews.map((review) => <ReviewCard review={review} />)}
                        </div>
                    ) : (
                        <p className="noReviews">No Reviews Yet</p>
                    )}
                </Fragment>
            )}
        </Fragment>
    );
};


export default ProductDetails;
