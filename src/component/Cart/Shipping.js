import React, { Fragment, useState } from "react";
import './Shipping.css';
import {Country , State} from "country-state-city";
import { useDispatch, useSelector } from "react-redux";
import HomeIcon from "@material-ui/icons/Home";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import PublicIcon from "@material-ui/icons/Public";
import PhoneIcon from "@material-ui/icons/Phone";
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
import PinDropIcon from "@material-ui/icons/PinDrop";
import MetaData from '../layout/MetaData.js';
import CheckoutSteps from "../Cart/CheckoutSteps.js";
import {saveShippingInfo} from "../../actions/cartAction.js";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Shipping = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {shippingInfo} = useSelector((state) => state.cart);
    console.log("shipping Infor", shippingInfo);

    const [address , setAdderss] = useState(shippingInfo.address);
    const [city , setCity] = useState(shippingInfo.city);
    const [state , setState] = useState(shippingInfo.state);
    const [country , setCountry] = useState(shippingInfo.country);
    const [pinCode , setPinCode] = useState(shippingInfo.pinCode);
    const [phoneNo , setPhoneNo] = useState(shippingInfo.phoneNo);

    const shippingSubmit = (e) => {
        e.preventDefault();
        if(phoneNo.length < 10 || phoneNo.length > 10) {
            toast.error("Phone Number should be 10 digits Long");
            return;
        }
        dispatch(   
            saveShippingInfo({
                address , 
                city , 
                state , 
                country , 
                pinCode , 
                phoneNo
            }));
        navigate("/order/confirm");
    };

    return (
        <Fragment>
            <MetaData title="Shipping Details" />
            <CheckoutSteps activeStep={1} />
            <div className="shippingContainer">
                <div className="shippingBox">
                    <h2 className="shippingHeading">Shipping Details</h2>
                    <form
                        className="shippingForm"
                        encType="multipart/form-data"
                        onSubmit={shippingSubmit}
                    >
                        <div className="f1">
                            <HomeIcon />
                            <input 
                                type='text'
                                placeholder="Address"
                                required
                                value={address}
                                onChange={(e) => setAdderss(e.target.value)}
                            />
                        </div>
                        <div className="f1">
                            <LocationCityIcon />
                            <input 
                                type='text'
                                placeholder="City"
                                required
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </div>
                        <div className="f1">
                            <PinDropIcon />
                            <input 
                                type='number'
                                placeholder="Pin Code"
                                required
                                value={pinCode}
                                onChange={(e) => setPinCode(e.target.value)}
                            />
                        </div>
                        <div className="f1">
                            <PhoneIcon/>
                            <input 
                                type='number'
                                placeholder="Phone Number"
                                required
                                value={phoneNo}
                                onChange={(e) => setPhoneNo(e.target.value)}
                                size='10'
                            />
                        </div>
                        <div className="f1">
                            <PublicIcon />
                            <select
                                required
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                            >
                                <option value="">Country</option>
                                {Country &&
                                    Country.getAllCountries().map((item) => (
                                        <option key =  {item.isoCode} value={item.isoCode}>
                                            {item.name}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                        {country && (
                            <div className="f1">
                                <TransferWithinAStationIcon />
                                <select
                                    required
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                >
                                    <option value="">State</option>
                                    {State &&
                                        State.getStatesOfCountry(country).map((item) => (
                                            <option key = {item.isoCode} value={item.isoCode}>
                                                {item.name}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>
                        )}
                        <input 
                            type="submit"
                            value="Continue"
                            className="shippingBtn"
                            disabled={state ? false : true}
                        />
                    </form>
                </div>

            </div>
        </Fragment>
    );
};

export default Shipping;
