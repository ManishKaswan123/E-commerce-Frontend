import axios from "axios";
import {
    CREATE_ORDER_FAIL ,
    CREATE_ORDER_REQUEST , 
    CREATE_ORDER_SUCCESS ,
    CLEAR_ERRORS
} from "../constants/orderConstant";

// Create Order
const createOrder = (order) => async(dispatch , getState) => {
    try {
        dispatch({type: CREATE_ORDER_REQUEST});

        const config = {
            headers: {
                "Content-type": "application/json"
            },
        };

        const {data} = await axios.post(`http://localhost:4000/api/v1/order/new` , order , config);

        console.log("createOrder data is :-", data);
        dispatch({
            type: CREATE_ORDER_SUCCESS ,
            payload: data
        });
    } catch (err) {
        console.log("createOrder data is error:-", err);
        dispatch({
            type: CREATE_ORDER_FAIL ,
            payload: err.response.data.message
        })
    }
};

const clearErrors = () => async(dispatch) => {
    dispatch({type: CLEAR_ERRORS});
}

export {createOrder , clearErrors};