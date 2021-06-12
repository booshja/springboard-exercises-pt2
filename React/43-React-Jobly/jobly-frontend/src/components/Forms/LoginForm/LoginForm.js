import React, { useState, useContext } from "react";
// context
import UserContext from "../../../context/UserContext";
// css
import "../../../assets/css/LoginForm.css";

const LoginForm = () => {
    // create blank slate for initial state
    const INITIAL_STATE = {
        username: "",
        password: "",
    };

    // set up state and context
    const [formData, setFormData] = useState(INITIAL_STATE);
    const { login } = useContext(UserContext);

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
        const VARIABLE = await login({ ...formData });
        setFormData(INITIAL_STATE);
    };

    return (
        <form onSubmit={handleSubmit} className="LoginForm">
            <label htmlFor="username" className="LoginForm--label">
                Username:
            </label>
            <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
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
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="LoginForm--input"
            />
            <button className="LoginForm--btn">Submit</button>
        </form>
    );
};

export default LoginForm;
