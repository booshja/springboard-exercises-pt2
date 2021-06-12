import React from "react";
import { Link } from "react-router-dom";
import "../../assets/css/Home.css";

const Home = () => {
    let loggedIn = false;
    return (
        <div className="Home">
            <img
                src="https://my.applychance.com/Source/Professor/img/STU-Register.png"
                alt="applicant working at desk"
                className="Home--img"
            />
            <h1 className="Home--title">Jobly</h1>
            <p className="Home--desc">All the jobs in one, convenient place.</p>
            {loggedIn ? (
                <p className="Home--returning">Welcome Back, username!</p>
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
