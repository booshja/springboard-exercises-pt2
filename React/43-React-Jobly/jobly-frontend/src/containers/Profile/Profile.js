import React from "react";
import ProfileEditForm from "../../components/Forms/ProfileEditForm/ProfileEditForm";
import "../../assets/css/Profile.css";

const Profile = () => {
    return (
        <div className="Profile">
            <h1 className="Profile--title">Profile</h1>
            <ProfileEditForm />
        </div>
    );
};

export default Profile;
