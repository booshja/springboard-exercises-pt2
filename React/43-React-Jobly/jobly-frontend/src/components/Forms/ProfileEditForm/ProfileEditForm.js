import React from "react";
import "../../../assets/css/ProfileEditForm.css";

const ProfileEditForm = () => {
    return (
        <form className="ProfileEditForm">
            <label htmlFor="username" className="ProfileEditForm--label">
                Username:
            </label>
            <input
                type="text"
                disabled
                id="username"
                name="username"
                className="ProfileEditForm--input--username"
                value="usernamegoeshere"
            />
            <label htmlFor="firstName" className="ProfileEditForm--label">
                First Name:
            </label>
            <input
                type="text"
                id="firstName"
                name="firstName"
                className="ProfileEditForm--input"
            />
            <label htmlFor="lastName" className="ProfileEditForm--label">
                Last Name:
            </label>
            <input
                type="text"
                id="lastName"
                name="lastName"
                className="ProfileEditForm--input"
            />
            <label htmlFor="email" className="ProfileEditForm--label">
                Email:
            </label>
            <input
                type="text"
                id="email"
                name="email"
                className="ProfileEditForm--input"
            />
            <label htmlFor="password" className="ProfileEditForm--label">
                Confirm Password:
            </label>
            <input
                type="password"
                id="password"
                name="password"
                className="ProfileEditForm--input"
            />
            <button className="ProfileEditForm--btn">Submit</button>
        </form>
    );
};

export default ProfileEditForm;
