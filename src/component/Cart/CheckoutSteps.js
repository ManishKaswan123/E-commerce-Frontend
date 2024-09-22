import React, { Fragment, useEffect, useState } from "react";
import { Stepper, Step, StepLabel } from "@material-ui/core";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import LibraryAddCheckIcon from "@material-ui/icons/LibraryAddCheck";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";

const CheckoutSteps = ({ activeStep }) => {
    const steps = [
        {
            label: "Shipping Details",
            icon: <LocalShippingIcon />
        },
        {
            label: "Confirm Order",
            icon: <LibraryAddCheckIcon />
        },
        {
            label: "Payment",
            icon: <AccountBalanceIcon />
        }
    ];

    const [marginTop, setMarginTop] = useState(window.innerWidth <= 1200 ? '10vmax' : '7vmax');

    useEffect(() => {
        const handleResize = () => {
            setMarginTop(window.innerWidth <= 1200 ? '10vmax' : '7vmax');
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <Fragment>
            <div className={`flex justify-center mt-${marginTop} bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 p-6 `}>
                <Stepper alternativeLabel activeStep={activeStep} className="w-full max-w-xl">
                    {steps.map((item, index) => (
                        <Step key={index} active={activeStep === index} completed={activeStep >= index}>
                            <StepLabel
                                icon={item.icon}
                                className={`${
                                    activeStep >= index ? 'text-orange-500' : 'text-gray-500'
                                }`}
                            >
                                <span className={`${
                                    activeStep >= index ? 'text-orange-500' : 'text-gray-500'
                                }`}>
                                    {item.label}
                                </span>
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </div>
        </Fragment>
    );
};

export default CheckoutSteps;
