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
    const productData =  [
        {
            ratings: 0,
            Stock: 32,
            numOfReviews: 0,
            _id: "6414759dd53f826ef7eb5931",
            name: "product2",
            description: "This is a sample Product2",
            price: 1,
            rating: 0,
            images: [
                {
                    public_id: "sample Image",
                    url: "https://i.ibb.co/DRST11n/1.webp",
                    _id: "6414759dd53f826ef7eb5932"
                }
            ],
            category: "Mobile",
            reviews: [],
            createdAt: "2023-03-17T14:13:49.768Z",
            __v: 0
        },
        {
            ratings: 5,
            Stock: 10,
            numOfReviews: 1,
            _id: "646cbab0494197ecad05bd43",
            name: "Samsung book 2",
            description: "This is a sample Product",
            price: 1,
            category: "Laptop",
            user: "6415f5265ed6aba73832cde6",
            images: [
                {
                    public_id: "sample Image",
                    url: "https://i.ibb.co/DRST11n/1.webp",
                    _id: "658e8c7d24ea4eef1999dd82"
                }
            ],
            reviews: [
                {
                    user: "646d900a7ad7f994fd7d8435",
                    name: "Abhishek",
                    rating: 5,
                    comment: "Just okay product",
                    _id: "646d90707ad7f994fd7d843f"
                }
            ],
            createdAt: "2023-05-23T13:08:00.287Z",
            __v: 2
        },
        {
            ratings: 0,
            Stock: 15,
            numOfReviews: 0,
            _id: "658e8b3624ea4eef1999dd68",
            name: "Realme ultra",
            description: "This is a sample Product",
            price: 1,
            images: [
                {
                    public_id: "Sample Iamge",
                    url: "https://i.ibb.co/DRST11n/1.webp",
                    _id: "658e8b3624ea4eef1999dd69"
                }
            ],
            category: "Mobile Phone",
            user: "658c18299eff3ab4d7913f2b",
            reviews: [],
            createdAt: "2023-12-29T09:02:46.438Z",
            __v: 0
        },
        {
            ratings: 0,
            Stock: 5,
            numOfReviews: 0,
            _id: "658e8b6f24ea4eef1999dd6c",
            name: "Samsang s22",
            description: "This is a sample Product",
            price: 1,
            images: [
                {
                    public_id: "Sample Iamge",
                    url: "https://i.ibb.co/DRST11n/1.webp",
                    _id: "658e8b6f24ea4eef1999dd6d"
                }
             ],
             category: "Mobile Phone",
             user: "658c18299eff3ab4d7913f2b",
             reviews: [],
             createdAt: `2023-12-29T09:03:43.509Z`,
             __v: 0
         },
         {
             ratings: 0,
             Stock: 7,
             numOfReviews: 0,
             _id: "658e8b9324ea4eef1999dd70",
             name: "Macbook air m1",
             description: "This is a sample Product",
             price: "73000",
             images: [
                 {
                     public_id: "Sample Iamge",
                     url: "https://i.ibb.co/DRST11n/1.webp",
                     _id: "658e8b9324ea4eef1999dd71"
                 }
             ],
             category: `Laptop`,
             user: `658c18299eff3ab4d7913f2b`,
             reviews: [],
             createdAt: "2023-12-29T09:04:19.320Z",
             __v: `0`
         },
         {
             ratings: `0`,
             Stock: `3`,
             numOfReviews: `0`,
             _id: `658e8bab24ea4eef1999dd74`,
             name: `Dell`,
             description: `This is a sample Product`,
             price: `45000`,
             images: [
                 {
                     public_id: "Sample Iamge",
                     url: "https://i.ibb.co/DRST11n/1.webp",
                     _id: "658e8bab24ea4eef1999dd75"
                 }
             ],
             category: `Laptop`,
             user: `658c18299eff3ab4d7913f2b`,
             reviews: [],
             createdAt: "2023-12-29T09:04:43.670Z",
             __v: `0`
         }
     ]
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

    const { products, error, productsCount, resultPerPage, filteredProductsCount } = useSelector(
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
                    <MetaData title="PRODUCTS --- ECOMMERCE" />
                    <div className="bg-teal-100 min-h-screen p-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="md:col-span-2">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {products ? products.map((product) => (
                                        <ProductCard key={product._id} product={product} />
                                        )) : (
                                        productData.map((product) => (
                                            <ProductCard key={product._id} product={product} />
                                        ))
                                    )
                                    }
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
    );
};

export default Products;
