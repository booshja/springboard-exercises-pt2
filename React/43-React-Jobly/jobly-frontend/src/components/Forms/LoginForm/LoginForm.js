import React from "react";
import "../../../assets/css/LoginForm.css";

const LoginForm = () => {
    return (
        <form className="LoginForm">
            <label htmlFor="username" className="LoginForm--label">
                Username:
            </label>
            <input
                type="text"
                id="username"
                name="username"
                placeholder="Username"
                className="LoginForm--input"
            />
            <label htmlFor="password" className="LoginForm--label">
                Password:
            </label>
            <input
                type="text"
                id="password"
                name="password"
                placeholder="Password"
                className="LoginForm--input"
            />
            <button className="LoginForm--btn">Submit</button>
        </form>
    );
};

export default LoginForm;
