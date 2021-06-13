import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
//context
import UserContext from "../../context/UserContext";

const ProtectedRoute = ({ children, ...rest }) => {
    // set up context
    const { user } = useContext(UserContext);
    return (
        <Route
            {...rest}
            render={() => (user ? children : <Redirect to="/" />)}
        />
    );
};

export default ProtectedRoute;
