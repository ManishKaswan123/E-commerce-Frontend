import React, { Fragment, useEffect } from 'react';
// import { CgArrowUpRight } from 'react-icons';
import "./Home.css";
import Product from "./ProductCard.js";
import MetaData from '../layout/MetaData.js';
import {getProduct} from "../../actions/productAction";
import {useSelector , useDispatch} from "react-redux";
import Loader from '../layout/Loader/Loader';
import { Link, useNavigate } from 'react-router-dom';

function Home() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {loading , error , products , productsCount}  = useSelector(
        (state) => state.products
    );

    console.log("products" , products);

    useEffect(() => {
        dispatch(getProduct());
    }, [dispatch]);

    return (
        <Fragment>
            {loading ? 
                <Loader /> :
                <Fragment>
                    <MetaData title="ECOMMERCE" />

                    <div className='banner'>
                        <p>
                            Welcome to Ecommerce
                        </p>
                        <h1>
                            FIND AMAZING PRODUCT BELOW
                        </h1>
                        <a href='#container'>
                            <button>
                                Scroll 
                            </button>
                        </a>
                    </div>
                    <h2 className='homeHeading'>
                        Featured Product
                    </h2>
                    <div id='container'>
                        <div className='searchBanner'>
                            <button className="search" onClick={() => navigate("/search")}>
                                Search Products
                            </button>
                        </div>
                        <div className='container'>

                            {products && products.map(product => (
                                <Product product={product} />
                            ))}

                        </div>
                    </div>
                </Fragment>
            }
        </Fragment>
    )
};

export default Home;