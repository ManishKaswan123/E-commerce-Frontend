import React, { Fragment, useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./Search.css"; // Ensure this file is updated with necessary styles or replaced with Tailwind CSS
import MetaData from "../layout/MetaData";

const Search = () => {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState("");

    const searchSubmitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) 
            navigate(`/products/${keyword}`);
        else
            navigate("/products");
    };

    return (
        <Fragment>
            <MetaData title="Search A Product -- ECOMMERCE" />
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-500">
                <form className="bg-white p-6 rounded-lg shadow-md w-full max-w-md" onSubmit={searchSubmitHandler}>
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">Search Products</h2>
                    <div className="flex items-center border-b border-gray-300 py-2">
                        <input 
                            type="text"
                            placeholder="Search a Product..."
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            className="w-full px-2 py-1 text-gray-700 focus:outline-none"
                        />
                        <input 
                            type="submit"
                            value="Search"
                            className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 cursor-pointer"
                        />
                    </div>
                </form>
            </div>
        </Fragment>
    );
};

export default Search;
