import axios from "axios";
import {
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    CLEAR_ERRORS
} from "../constants/productConstants";

// Getting All Products
const getProduct = (keyword = "" , currentPage = 1 , price = [0 , 250000] , category , ratings = 0) => async (dispatch) => {
    try {
        dispatch({
            type: ALL_PRODUCT_REQUEST
        });

        // console.log("ok" , keyword);
        let link = `https://e-commerce-backend-2-gck1.onrender.com/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

        if(category)
            link = `https://e-commerce-backend-2-gck1.onrender.com/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;

        const { data } = await axios.get(link);

        console.log("data is" , data);
        dispatch({
            type: ALL_PRODUCT_SUCCESS,
            payload: data
        });
    } catch (err) {
        dispatch({
            type: ALL_PRODUCT_FAIL,
            payload: err.response.data.message
        });
    }
};


// Get product Details
const getProductDetails = ({id}) => async (dispatch) => {
    try {
        dispatch({
            type: PRODUCT_DETAILS_REQUEST
        });

        const { data } = await axios.get(`https://e-commerce-backend-2-gck1.onrender.com/api/v1/product/${id}`);
        console.log("data is" , data);
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.product
        });
    } catch (err) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: err.response.data.message
        });
    }
};


// Clearing Errors
const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    });
};

export {getProduct , clearErrors , getProductDetails};