import React, { useContext } from "react";
import { Link } from "react-router-dom";
// context
import UserContext from "../../context/UserContext";
// images
import src from "../../assets/images/applicant.png";
// css
import "../../assets/css/Home.css";

const Home = () => {
    //set up context
    const { user } = useContext(UserContext);
    return (
        <div className="Home">
            <img
                src={src}
                alt="applicant working at desk"
                className="Home--img"
            />
            <h1 className="Home--title">Jobly</h1>
            <p className="Home--desc">All the jobs in one, convenient place.</p>
            {user ? (
                <p className="Home--returning">
                    Welcome Back, {user.firstName}!
                </p>
            ) : (
                <div className="Home--cta">
                    <Link to="/signup" className="Home--cta--button">
                        Sign Up
                    </Link>
                    <Link to="/login" className="Home--cta--button">
                        Log In
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Home;
