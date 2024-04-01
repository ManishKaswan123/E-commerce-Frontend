import React, { Fragment, useEffect, useState } from "react";
import "./Products.css";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../actions/productAction";
import { useParams } from "react-router-dom";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import { Link } from 'react-router-dom';
import MetaData from "../layout/MetaData";

const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhone",
    "Tablet"
];

const Products = () => {
    let totatPages = 1;
    const dispatch = useDispatch();
    const keywords = useParams();

    const [price , setPrice] = useState([0 , 250000]);
    const [currentPage , setCurrentPage] = useState(1);
    const [category , setCategory] = useState("");
    const [ratings , setRatings] = useState(0);

    const getPrevPage = () => {
        if(currentPage > 1)
            setCurrentPage(currentPage-1);
    };

    const getNextPage = () => {
        if(currentPage < totatPages)
            setCurrentPage(currentPage+1);
    };

    const priceHandler =(e , newPrice) => {
        setPrice(newPrice);
    };

    const {products , loading , error , productsCount , resultPerPage , filteredProductsCount} = useSelector(
        (state) => state.products
    );

    console.log("Products loading" , loading);
    let count = filteredProductsCount;


    if(count % resultPerPage === 0)
        totatPages = count/resultPerPage;
    else
        totatPages = Math.floor((count/resultPerPage))+1;

    console.log("count ", count , "totalPages ", totatPages);
    console.log(keywords , keywords.keyword);

    useEffect(() => {
        dispatch(getProduct(keywords.keyword , currentPage , price , category , ratings));
    } , [dispatch , keywords.keyword , currentPage , price , category , ratings]);

    return (
        <Fragment>
            {
                loading ? <Loader /> :
                <Fragment>
                    <MetaData title = "PRODUCTS --- ECOMMERCE" />
                    {/* <div className='searchBanner'>
                        <Link className="search" to={"/search"}>Search Products</Link>
                    </div> */}
                    <div className="products">
                        {
                            products && 
                            products.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))
                        }
                    </div>

                    <div className="filterBox">
                        <Typography>Price</Typography>
                        <Slider
                            value={price}
                            onChange={priceHandler}
                            valueLabelDisplay="auto"
                            aria-labelledby="range-slider"
                            min={0}
                            max={250000}
                        />
                        <Typography>Categories</Typography>
                        <ul className="categoryBox">
                            {categories.map((category) => (
                                <li
                                    className="category-link"
                                    key={category}
                                    onClick={() => setCategory(category)}
                                >
                                    {category}
                                </li>
                            ))}
                        </ul>
                        <fieldset>
                            <Typography component='legend'>
                                Ratings Above
                            </Typography>
                            <Slider 
                                value={ratings}
                                valueLabelDisplay="auto"
                                onChange={(e, newRatings) => {
                                    setRatings(newRatings)
                                }}
                                aria-labelledby="continuous-slider"
                                min={0}
                                max={5}
                            />
                        </fieldset>
                    </div>

                    {
                        totatPages > 1 &&
                        <div className="pangination">
                            <button className = "pangination_btn" onClick={() => getPrevPage()}>PREV</button>
                            <p className="pagination_text">
                                {currentPage} of {totatPages}
                            </p>
                            <button className = "pangination_btn" onClick={() => getNextPage()}>NEXT</button>
                        </div>
                    }
                </Fragment>
            }
        </Fragment>
    );
};

export default Products;