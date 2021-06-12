import React, { useState, useContext } from "react";
// context
import UserContext from "../../../context/UserContext";
// css
import "../../../assets/css/ProfileEditForm.css";

const ProfileEditForm = () => {
    // create blank slate for initial state
    const INITIAL_STATE = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    };

    // set up state and context
    const [formData, setFormData] = useState(INITIAL_STATE);
    const { editUser } = useContext(UserContext);

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
        const VARIABLE = await editUser({ ...formData });
        setFormData(INITIAL_STATE);
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
                value={formData.email}
                onChange={handleChange}
                className="ProfileEditForm--input"
            />
            <label htmlFor="password" className="ProfileEditForm--label">
                Confirm Password:
            </label>
            <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="ProfileEditForm--input"
            />
            <button className="ProfileEditForm--btn">Submit</button>
        </form>
    );
};

export default ProfileEditForm;
