import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
// context
import UserContext from "../../../context/UserContext";
// css
import "../../../assets/css/SignupForm.css";

const SignupForm = () => {
    // create blank slate for initial state
    const INITIAL_STATE = {
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
    };

    // set up state, context, and history object
    const [formData, setFormData] = useState(INITIAL_STATE);
    const [error, setError] = useState(false);
    const { signup } = useContext(UserContext);
    const history = useHistory();

    const handleChange = (e) => {
        /** On form input change, update the value in state */
        const { name, value } = e.target;
        setFormData((formData) => ({
            ...formData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        /**
         * When form submits:
         * - Prevent reload of page
         * - Send data to API
         * - Clean the form inputs via state
         */
        e.preventDefault();
        try {
            await signup({ ...formData });
            setError(false);
            setFormData(INITIAL_STATE);
            history.push("/");
        } catch (e) {
            setError("Error registering user. Please try again.");
            setFormData((formData) => formData);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="SignupForm">
            <label htmlFor="username" className="SignupForm--label">
                Username:
            </label>
            <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
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
                value={formData.password}
                onChange={handleChange}
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
                value={formData.firstName}
                onChange={handleChange}
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
                value={formData.lastName}
                onChange={handleChange}
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
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="SignupForm--input"
            />
            {error ? (
                <span id="error" className="error">
                    {error}
                </span>
            ) : null}
            <button className="SignupForm--btn">Submit</button>
        </form>
    );
};

export default SignupForm;
