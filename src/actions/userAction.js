import {
    LOGIN_FAIL ,
    LOGIN_REQUEST ,
    LOGIN_SUCCESS,
    REGISTER_USER_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    LOAD_USER_REQUEST ,
    LOAD_USER_SUCCESS , 
    LOAD_USER_FAIL ,
    LOGOUT_FAIL ,
    LOGOUT_SUCCESS ,
    UPDATE_PROFILE_FAIL , 
    UPDATE_PROFILE_REQUEST , 
    UPDATE_PROFILE_RESET , 
    UPDATE_PROFILE_SUCCESS ,
    CLEAR_ERRORS ,
    UPDATE_PASSWORD_REQUEST , 
    UPDATE_PASSWORD_SUCCESS , 
    UPDATE_PASSWORD_FAIL ,
    FORGOT_PASSWORD_FAIL , 
    FORGOT_PASSWORD_REQUEST , 
    FORGOT_PASSWORD_SUCCESS ,
    RESET_PASSWORD_FAIL , 
    RESET_PASSWORD_REQUEST , 
    RESET_PASSWORD_SUCCESS ,
} from "../constants/userConstants";

import axios from "axios";

// Login User
const login = (email, password) => async (dispatch , getState) => {
    try {
        dispatch({type: LOGIN_REQUEST});

        const config = {headers: {"Content-Type": "application/json"}};

        const {data} = await axios.post(
            `http://localhost:4000/api/v1/login` ,
            {email , password} ,
            config
        );
        
        dispatch({ 
            type: LOGIN_SUCCESS ,
            payload: data.user
        });
        if(data)
            localStorage.setItem("user" , JSON.stringify(getState().user));
    }
    catch (error) {
        console.log("message" , error.response.data.message);
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.message
        });
    }
};

// Regiser New User
const register = (userData) => async (dispatch) => {
    try {
        dispatch({type: REGISTER_USER_REQUEST});

        const config = {headers: {"Content-Type": "multipart/form-data"}};

        const {data} = await axios.post(
            `http://localhost:4000/api/v1/register` ,
            userData,
            config
        );
        
        console.log("register user is running" , data);
        dispatch({ 
            type: REGISTER_USER_SUCCESS ,
            payload: data.user
        });
    }
    catch (error) {
        console.log("message" , error.response.data.message);
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response.data.message
        });
    }
};

// Load User
const loadUser = () => async (dispatch) => {
    try {
        dispatch({type: LOAD_USER_REQUEST});

        const {data} = await axios.get(`http://localhost:4000/api/v1/me` );
    
        console.log("load user is running" , data);
        dispatch({ 
            type: LOAD_USER_SUCCESS ,
            payload: data.user
        });
    }
    catch (error) {
        console.log("message" , error.response.data.message);
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response.data.message
        });
    }
};

// LogOut User
const logout = () => async (dispatch) => {
    try {
        await axios.get(`http://localhost:4000/api/v1/logout` );
        dispatch({ 
            type: LOGOUT_SUCCESS 
        });
        localStorage.removeItem("user");
    }
    catch (error) {
        dispatch({
            type: LOGOUT_FAIL,
            payload: error.response.data.message
        });
    }
};

// Update Profile
const updateProfile = (userData) => async (dispatch) => {
    try {
        console.log("update profile is running");
        dispatch({type: UPDATE_PROFILE_REQUEST});

        const config = {headers: {"Content-Type": "multipart/form-data"}};

        const {data} = await axios.put(
            `http://localhost:4000/api/v1/me/update` ,
            userData,
            config
        );
        dispatch({ 
            type: UPDATE_PROFILE_SUCCESS ,
            payload: data.success
        });
    }
    catch (error) {
        console.log("message" , error.response.data.message);
        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload: error.response.data.message
        });
    }
};

// Update Password
const updatePassword = (passwords) => async (dispatch) => {
    try {
        
        dispatch({type: UPDATE_PASSWORD_REQUEST});

        const config = {headers: {"Content-Type": "application/json"}};
        const {data} = await axios.put(
            `http://localhost:4000/api/v1/password/update` ,
            passwords,
            config
        );
        console.log("update password is running :-",data);
        dispatch({ 
            type: UPDATE_PASSWORD_SUCCESS ,
            payload: data.success
        });
    }
    catch (error) {
        console.log("message" , error.response.data.message);
        dispatch({
            type: UPDATE_PASSWORD_FAIL,
            payload: error.response.data.message
        });
    }
};

// Forgot Password
const forgotPassword = (email) => async (dispatch) => {
    try {
        dispatch({type: FORGOT_PASSWORD_REQUEST});

        const config = {headers: {"Content-Type": "application/json"}};

        const {data} = await axios.post(
            `http://localhost:4000/api/v1/password/forgot` ,
            email ,
            config
        );

        dispatch({ 
            type: FORGOT_PASSWORD_SUCCESS ,
            payload: data.message
        });
    }
    catch (error) {
        console.log("message" , error.response.data.message);
        dispatch({
            type: FORGOT_PASSWORD_FAIL,
            payload: error.response.data.message
        });
    }
};

// Reset Password
const resetPassword = (token , passwords) => async (dispatch) => {
    try {
        dispatch({type: RESET_PASSWORD_REQUEST});

        const config = {headers: {"Content-Type": "application/json"}};

        const {data} = await axios.put(
            `http://localhost:4000/api/v1/password/reset/${token}` ,
            passwords,
            config
        );

        dispatch({ 
            type: RESET_PASSWORD_SUCCESS ,
            payload: data.success
        });
    }
    catch (error) {
        console.log("message" , error.response.data.message);
        dispatch({
            type: RESET_PASSWORD_FAIL,
            payload: error.response.data.message
        });
    }
};

const clearErrors = () => async(dispatch) => {
    dispatch({type: CLEAR_ERRORS});
}

export {login , clearErrors , register , loadUser , logout , updateProfile , updatePassword , forgotPassword , resetPassword};