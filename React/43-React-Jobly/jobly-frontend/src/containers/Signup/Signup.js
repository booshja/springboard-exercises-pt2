import React from "react";
// components
import SignupForm from "../../components/Forms/SignupForm/SignupForm";
// css
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
