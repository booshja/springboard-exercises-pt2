import React from "react";
import SignupForm from "../../components/Forms/SignupForm/SignupForm";
import "../../assets/css/Signup.css";

const Signup = () => {
    return (
        <div className="Signup">
            <h1 className="Signup--title">Sign Up</h1>
            <SignupForm />
        </div>
    );
};

export default Signup;
