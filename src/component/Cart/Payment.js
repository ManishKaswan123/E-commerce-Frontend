import React, { Fragment, useRef } from "react";
import './Payment.css';
import CreditCartIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import MetaData from "../layout/MetaData";
import CheckoutSteps from "./CheckoutSteps";
import { Typography } from "@material-ui/core";
import {
    CardCvcNumberElement , 
    CardExpiryElement ,
    CardNumberElement,
} from "@stripe/react-stripe-js";

export default function Payment ({ stripeApiKey }) {
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
    const submitHandler = () => {

    }
    const payBtn = useRef(null);
    return (
        <Fragment>
            <MetaData title="Payment" />
            <CheckoutSteps activeStep={2} />
            <div className="paymentContainer">
                <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
                    <Typography>Cart Info</Typography>
                    <div>
                        <CreditCartIcon />
                        <CardNumberElement className="paymentInput" apiKey={stripeApiKey} />
                    </div>
                    <div>
                        <EventIcon />
                        <CardExpiryElement className="paymentInput" apiKey={stripeApiKey} />
                    </div>
                    <div>
                        <VpnKeyIcon />
                        <CardCvcNumberElement className="paymentInput" apiKey={stripeApiKey} />
                    </div>
                    <input 
                        type="submit"
                        value={`Pay - ${orderInfo && orderInfo.totalPrice}`}
                        ref={payBtn}
                        className="paymentFormBtn"
                    />
                </form>

            </div>
        </Fragment>
    )
};

