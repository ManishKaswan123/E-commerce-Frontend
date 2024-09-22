import React, { Fragment, useEffect, useState } from "react";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../actions/productAction";
import { useParams } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
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
    let totalPages = 1;
    const dispatch = useDispatch();
    const keywords = useParams();

    const [price, setPrice] = useState([0, 250000]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [ratings, setRatings] = useState(0);

    // Local state for filters
    const [filterPrice, setFilterPrice] = useState([0, 250000]);
    const [filterCategories, setFilterCategories] = useState([]);
    const [filterRatings, setFilterRatings] = useState(0);

    const getPrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const getNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handleCategoryClick = (category) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter(cat => cat !== category));
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    const clearFilters = () => {
        setPrice([0, 250000]);
        setSelectedCategories([]);
        setRatings(0);
        setCurrentPage(1);
        applyFilters(); // Reset filters immediately
    };

    const applyFilters = () => {
        setFilterPrice(price);
        setFilterCategories(selectedCategories);
        setFilterRatings(ratings);
        dispatch(getProduct(keywords.keyword, currentPage, price, selectedCategories.join(','), ratings));
    };

    const { products, loading, error, productsCount, resultPerPage, filteredProductsCount } = useSelector(
        (state) => state.products
    );

    let count = filteredProductsCount;

    if (count % resultPerPage === 0)
        totalPages = count / resultPerPage;
    else
        totalPages = Math.floor((count / resultPerPage)) + 1;

    useEffect(() => {
        dispatch(getProduct(keywords.keyword, currentPage, filterPrice, filterCategories.join(','), filterRatings));
    }, [dispatch, keywords.keyword, currentPage]);

    return (
        <Fragment>
            {loading ? <Loader /> :
                <Fragment>
                    <MetaData title="PRODUCTS --- ECOMMERCE" />
                    <div className="bg-teal-100 min-h-screen p-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="md:col-span-2">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {products && products.map((product) => (
                                        <ProductCard key={product._id} product={product} />
                                    ))}
                                </div>
                            </div>

                            <div className="bg-indigo-200 text-gray-800 p-6 rounded-lg shadow-md">
                                <Typography variant="h6" className="text-xl font-bold mb-4">Filters</Typography>
                                
                                {/* Clear Filters Button */}
                                <button 
                                    onClick={clearFilters}
                                    className="mb-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
                                >
                                    Clear All Filters
                                </button>

                                {/* Price Range Input */}
                                <div className="mb-6">
                                    <Typography variant="subtitle1" className="font-semibold">Price Range</Typography>
                                    <div className="flex space-x-4 mt-2">
                                        <input 
                                            type="number" 
                                            value={price[0]} 
                                            onChange={(e) => setPrice([Number(e.target.value), price[1]])}
                                            className="w-full px-2 py-1 border rounded"
                                            placeholder="Min Price"
                                        />
                                        <input 
                                            type="number" 
                                            value={price[1]} 
                                            onChange={(e) => setPrice([price[0], Number(e.target.value)])}
                                            className="w-full px-2 py-1 border rounded"
                                            placeholder="Max Price"
                                        />
                                    </div>
                                </div>

                                {/* Categories with Multi-select */}
                                <div className="mb-6">
                                    <Typography variant="subtitle1" className="font-semibold">Categories</Typography>
                                    <div className="flex flex-wrap mt-2">
                                        {categories.map((cat) => (
                                            <button
                                                key={cat}
                                                className={`px-4 py-2 m-1 rounded-full ${selectedCategories.includes(cat) ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-blue-400 transition ease-in-out duration-300 transform hover:scale-105`}
                                                onClick={() => handleCategoryClick(cat)}
                                            >
                                                {cat}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Ratings Input */}
                                <div>
                                    <Typography variant="subtitle1" className="font-semibold">Ratings Above</Typography>
                                    <input 
                                        type="number" 
                                        value={ratings} 
                                        onChange={(e) => setRatings(Number(e.target.value))}
                                        min={0}
                                        max={5}
                                        step={0.5}
                                        className="w-full px-2 py-1 border rounded mt-2"
                                        placeholder="Minimum Rating"
                                    />
                                </div>

                                {/* Apply Filters Button */}
                                <button 
                                    onClick={applyFilters}
                                    className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
                                >
                                    Apply Filters
                                </button>
                            </div>
                        </div>

                        {totalPages > 1 && (
                            <div className="flex justify-center items-center mt-8">
                                <button
                                    className="px-4 py-2 mx-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition ease-in-out duration-300 transform hover:scale-105"
                                    onClick={() => getPrevPage()}
                                >
                                    PREV
                                </button>
                                <span className="text-lg">{currentPage} of {totalPages}</span>
                                <button
                                    className="px-4 py-2 mx-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition ease-in-out duration-300 transform hover:scale-105"
                                    onClick={() => getNextPage()}
                                >
                                    NEXT
                                </button>
                            </div>
                        )}
                    </div>
                </Fragment>
            }
        </Fragment>
    );
};

export default Products;
