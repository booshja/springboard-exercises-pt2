import React from "react";
import "../../../assets/css/SignupForm.css";

const SignupForm = () => {
    return (
        <form className="SignupForm">
            <label htmlFor="username" className="SignupForm--label">
                Username:
            </label>
            <input
                type="text"
                id="username"
                name="username"
                className="SignupForm--input"
                placeholder="Username"
            />
            <label htmlFor="password" className="SignupForm--label">
                Password:
            </label>
            <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                className="SignupForm--input"
            />
            <label htmlFor="firstName" className="SignupForm--label">
                First Name:
            </label>
            <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="First Name"
                className="SignupForm--input"
            />
            <label htmlFor="lastName" className="SignupForm--label">
                Last Name:
            </label>
            <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Last Name"
                className="SignupForm--input"
            />
            <label htmlFor="email" className="SignupForm--label">
                Email:
            </label>
            <input
                type="text"
                id="email"
                name="email"
                placeholder="Email"
                className="SignupForm--input"
            />
            <button className="SignupForm--btn">Submit</button>
        </form>
    );
};

export default SignupForm;
