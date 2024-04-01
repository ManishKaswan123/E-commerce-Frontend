import React, { Fragment, useEffect, useState } from "react";
import { Step, StepLabel, Stepper, Typography } from "@material-ui/core";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import LibraryAddCheckIcon from "@material-ui/icons/LibraryAddCheck";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import './CheckoutSteps.css';

const CheckoutSteps = ({ activeStep }) => {
    const steps = [
        {
            label: <Typography>Shipping Details</Typography>,
            icon: <LocalShippingIcon />
        },
        {
            label: <Typography>Confirm Order</Typography>,
            icon: <LibraryAddCheckIcon />
        },
        {
            label: <Typography>Payment</Typography>,
            icon: <AccountBalanceIcon />
        }
    ];

    const [marginTop, setMarginTop] = useState(window.innerWidth <= 1200 ? '10vmax' : '7vmax');

    useEffect(() => {
        const handleResize = () => {
            setMarginTop(window.innerWidth <= 1200 ? '10vmax' : '7vmax');
        };

        window.addEventListener('resize', handleResize);

        // Cleanup function
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []); // Empty dependency array to ensure the effect runs only once

    const stepStyles = {
        boxSizing: "border-box",
        marginTop: marginTop
    };

    return (
        <Fragment>
            <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
                {steps.map((item, index) => (
                    <Step
                        key={index}
                        active={activeStep === index ? true : false}
                        completed={activeStep >= index ? true : false}
                    >
                        <StepLabel
                            icon={item.icon}
                            style={{
                                color: activeStep >= index ? "tomato" : "rgba(0 , 0 , 0 , 0.649)"
                            }}
                        >
                            {item.label}
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Fragment>
    );
};

export default CheckoutSteps;
