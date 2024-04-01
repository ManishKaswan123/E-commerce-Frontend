import { createStore, combineReducers, applyMiddleware } from "redux";
import {thunk} from "redux-thunk";
import  { productDetailsReducer , productReducer} from "./reducers/productReducer";
import { userReducer , profileReducer, forgotPasswordReducer } from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import {newOrderReducer} from "./reducers/orderReducer";
// import { composeWithDevTools } from "redux-devtools-extension";

const reducer = combineReducers({
    products: productReducer,
    productDetails: productDetailsReducer,
    profile: profileReducer,
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer ,
    newOrder: newOrderReducer
});

let initialState = {
    cart: { 
        cartItems: localStorage.getItem("cartItems") 
            ? JSON.parse(localStorage.getItem("cartItems")) 
            : [] ,
        shippingInfo: localStorage.getItem("shippingInfo") 
            ? JSON.parse(localStorage.getItem("shippingInfo"))
            : {} ,
    } ,
    user: localStorage.getItem("user") 
        ? JSON.parse(localStorage.getItem("user"))
        : []
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    applyMiddleware(...middleware)
);

export default store;