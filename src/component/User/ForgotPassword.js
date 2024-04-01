import React, { Fragment,useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {clearErrors , forgotPassword} from "../../actions/userAction";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import { toast } from "react-hot-toast";
import './ForgotPassword.css';

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const [email , setEmail] = useState("");

    const {error , message , loading} = useSelector(
        (state) => state.forgotPassword
    );

    const forgotPasswordSubmit = (e) => {
        e.preventDefault();
        let myForm = {};
        myForm.email = email;
        dispatch(forgotPassword(myForm));
    };

    useEffect(() => {
        if(error) {
            toast.error(error);
            console.log("error is :- ",error);
            dispatch(clearErrors);
        }
        if(message) 
            toast.success(message)

    } , [dispatch, error , message , toast]);

    return(
        <Fragment>
            {loading ? 
                <Loader /> :
                <Fragment>
                    <MetaData title="Forgot Password" />
                    <div className="forgotPasswordContainer">
                        <div className="forgotPasswordBox">
                            <h2 className="forgotPasswordHeading">Forgot Password</h2>
                            <form className="forgotPasswordForm"  onSubmit={forgotPasswordSubmit}>
                                <div className="forgotPasswordEmail">
                                    <MailOutlineIcon />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        required
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <input 
                                    type="submit"
                                    value="Send"
                                    className="forgotPasswordBtn"
                                    // disabled={loading ? true : false}
                                />
                            </form>
                        </div>
                    </div>
                </Fragment>
            }
        </Fragment>
    )
};

export default ForgotPassword;