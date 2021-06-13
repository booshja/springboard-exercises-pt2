import React from "react";
// component
import LoginForm from "../../components/Forms/LoginForm/LoginForm";
// css
import "../../assets/css/Login.css";

const Login = () => {
    return (
        <div className="Login">
            <h1 className="Login--title">Log In</h1>
            <LoginForm />
        </div>
    );
};

export default Login;
