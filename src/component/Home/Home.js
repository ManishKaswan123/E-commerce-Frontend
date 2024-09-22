import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getProduct } from "../../actions/productAction";
import Loader from '../layout/Loader/Loader';
import ProductCard from './ProductCard';  // Import your ProductCard component
import CustomCard from './CustomCard';
import './Home.css';
import { useNavigate } from 'react-router-dom';

function Home() {
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
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, products } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(getProduct());
    }, [dispatch]);

    const [keyword, setKeyword] = useState("");

    const searchSubmitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) 
            navigate(`/products/${keyword}`);
        else
            navigate("/products");
    }

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    {/* Background and Text Section */}
                    <section className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-white text-white relative overflow-hidden">
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-10">
                            {/* Left Section for Text and Search */}
                            <div className="space-y-6 z-10 mb-10 md:mb-0">
                                <h1 className="text-6xl font-bold animate-fadeInUp mb-5">
                                    Elevate Your Shopping Experience
                                </h1>
                                <p className="text-2xl animate-fadeInUp delay-2">
                                    Discover amazing products tailored for you.
                                </p>

                                {/* Search Input */}
                                <div className="flex flex-wrap items-center space-x-2 animate-fadeInUp delay-3 gap-2">
                                    <input 
                                        type="text" 
                                        placeholder="Search for products..." 
                                        onChange={(e) => setKeyword(e.target.value)}
                                        className="px-4 py-2 rounded-lg bg-gray-100 text-black focus:outline-none"
                                    />
                                    <button onClick={searchSubmitHandler} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">
                                        Search
                                    </button>
                                </div>

                                {/* Button */}
                                <button onClick={() => navigate('/products')} className="mt-6 px-8 py-3 bg-pink-500 text-white font-semibold rounded-lg shadow-lg hover:bg-pink-600 transition duration-300 animate-fadeInUp delay-3">
                                    Explore Products
                                </button>
                            </div>

                            {/* Cards Section on Right */}
                            <div className="w-full md:w-auto mt-[40%] md:mt-0">
                                {/* Overlapping Cards */}
                                <CustomCard 
                                    imageOnRight={true} 
                                    showImage={true} 
                                    className="card card-1 transform transition-all duration-300" 
                                />
                            </div>
                        </div>
                    </section>

                    {/* Product Cards Section */}
                    <section className="py-20 bg-gradient-to-b from-white via-blue-400 to-gray-400">
                        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 px-4">
                            {products ? products.map((product) => (
                                <ProductCard key={product._id} product={product} />
                                )) : productData.map((product) => (
                                    <ProductCard key={product._id} product={product} />
                                ))
                            }
                        </div>
                    </section>
                </>
            )}
        </>
    );
};

export default Home;
