import React, { Fragment, useState } from "react";
import { Country, State } from "country-state-city";
import { useDispatch, useSelector } from "react-redux";
import HomeIcon from "@material-ui/icons/Home";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import PublicIcon from "@material-ui/icons/Public";
import PhoneIcon from "@material-ui/icons/Phone";
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
import PinDropIcon from "@material-ui/icons/PinDrop";
import MetaData from '../layout/MetaData.js';
import CheckoutSteps from "../Cart/CheckoutSteps.js";
import { saveShippingInfo } from "../../actions/cartAction.js";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Shipping = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { shippingInfo } = useSelector((state) => state.cart);

    const [address, setAddress] = useState(shippingInfo.address);
    const [city, setCity] = useState(shippingInfo.city);
    const [state, setState] = useState(shippingInfo.state);
    const [country, setCountry] = useState(shippingInfo.country);
    const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

    const shippingSubmit = (e) => {
        e.preventDefault();
        if (phoneNo.length !== 10) {
            toast.error("Phone Number should be 10 digits long");
            return;
        }
        dispatch(
            saveShippingInfo({
                address,
                city,
                state,
                country,
                pinCode,
                phoneNo
            })
        );
        navigate("/order/confirm");
    };

    return (
        <Fragment>
            <MetaData title="Shipping Details" />
            <CheckoutSteps activeStep={1} />
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-500">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-6 text-center">Shipping Details</h2>
                    <form className="space-y-4" onSubmit={shippingSubmit}>
                        <div className="flex items-center border-b border-gray-300 py-2">
                            <HomeIcon className="mr-2 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Address"
                                required
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="w-full px-2 py-1 text-gray-700 focus:outline-none"
                            />
                        </div>
                        <div className="flex items-center border-b border-gray-300 py-2">
                            <LocationCityIcon className="mr-2 text-gray-500" />
                            <input
                                type="text"
                                placeholder="City"
                                required
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                className="w-full px-2 py-1 text-gray-700 focus:outline-none"
                            />
                        </div>
                        <div className="flex items-center border-b border-gray-300 py-2">
                            <PinDropIcon className="mr-2 text-gray-500" />
                            <input
                                type="number"
                                placeholder="Pin Code"
                                required
                                value={pinCode}
                                onChange={(e) => setPinCode(e.target.value)}
                                className="w-full px-2 py-1 text-gray-700 focus:outline-none"
                            />
                        </div>
                        <div className="flex items-center border-b border-gray-300 py-2">
                            <PhoneIcon className="mr-2 text-gray-500" />
                            <input
                                type="number"
                                placeholder="Phone Number"
                                required
                                value={phoneNo}
                                onChange={(e) => setPhoneNo(e.target.value)}
                                className="w-full px-2 py-1 text-gray-700 focus:outline-none"
                            />
                        </div>
                        <div className="flex items-center border-b border-gray-300 py-2">
                            <PublicIcon className="mr-2 text-gray-500" />
                            <select
                                required
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                className="w-full px-2 py-1 text-gray-700 focus:outline-none bg-transparent"
                            >
                                <option value="">Country</option>
                                {Country &&
                                    Country.getAllCountries().map((item) => (
                                        <option key={item.isoCode} value={item.isoCode}>
                                            {item.name}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        {country && (
                            <div className="flex items-center border-b border-gray-300 py-2">
                                <TransferWithinAStationIcon className="mr-2 text-gray-500" />
                                <select
                                    required
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                    className="w-full px-2 py-1 text-gray-700 focus:outline-none bg-transparent"
                                >
                                    <option value="">State</option>
                                    {State &&
                                        State.getStatesOfCountry(country).map((item) => (
                                            <option key={item.isoCode} value={item.isoCode}>
                                                {item.name}
                                            </option>
                                        ))}
                                </select>
                            </div>
                        )}
                        <button
                            type="submit"
                            className={`w-full mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ${!state ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={!state}
                        >
                            Continue
                        </button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default Shipping;
