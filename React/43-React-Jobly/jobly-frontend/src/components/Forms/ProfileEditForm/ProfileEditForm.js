import React, { useState, useContext } from "react";
// context
import UserContext from "../../../context/UserContext";
// css
import "../../../assets/css/ProfileEditForm.css";

const ProfileEditForm = () => {
    // set up context
    let { update, user } = useContext(UserContext);
    // create blank slate for initial state
    const INITIAL_STATE = {
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: "",
    };

    // set up state and history object
    const [formData, setFormData] = useState(INITIAL_STATE);
    const [error, setError] = useState(false);

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

        // set up data for editing based on form
        let userData = {};
        const options = ["firstName", "lastName", "email", "password"];
        for (let key of options) {
            if (formData[key] !== "") {
                userData[key] = formData[key];
            }
        }
        try {
            await update(user.username, userData);
            setError("success");
        } catch (e) {
            setError("Error updating information. Please try again.");
            setFormData((formData) => formData);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="ProfileEditForm">
            <label htmlFor="username" className="ProfileEditForm--label">
                Username:
            </label>
            <input
                type="text"
                disabled
                id="username"
                name="username"
                value={formData.username}
                className="ProfileEditForm--input--username"
            />
            <label htmlFor="firstName" className="ProfileEditForm--label">
                First Name:
            </label>
            <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="ProfileEditForm--input"
            />
            <label htmlFor="lastName" className="ProfileEditForm--label">
                Last Name:
            </label>
            <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="ProfileEditForm--input"
            />
            <label htmlFor="email" className="ProfileEditForm--label">
                Email:
            </label>
            <input
                type="text"
                id="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="ProfileEditForm--input"
            />
            <label htmlFor="password" className="ProfileEditForm--label">
                Change Password:
            </label>
            <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="ProfileEditForm--input"
            />
            {error ? (
                <span
                    id={error === "success" ? "success" : "error"}
                    className="error"
                >
                    {error}
                </span>
            ) : null}
            <button className="ProfileEditForm--btn">Submit</button>
        </form>
    );
};

export default ProfileEditForm;
