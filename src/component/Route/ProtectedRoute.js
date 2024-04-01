import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Route , useNavigate} from "react-router-dom";

const ProtectedRoute = ({component: Component , ...rest}) => {
    const navigate = useNavigate();
    const {loading , isAuthenticated , user} = useSelector((state) => state.user);
    return (
        <>
            {!loading && 
                (
                    <Route 
                        {...rest}
                        render = {(props) => {
                            if(!isAuthenticated)
                                return navigate("/login");
                            return <Component {...props} />;
                        }}
                    />
                )
            }
        </>
    );
};

export default ProtectedRoute;