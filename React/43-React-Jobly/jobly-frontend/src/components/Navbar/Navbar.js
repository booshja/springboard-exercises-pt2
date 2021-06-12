import React from "react";
import { NavLink } from "react-router-dom";
import "../../assets/css/Navbar.css";

const Navbar = () => {
    return (
        <div className="Navbar">
            <NavLink exact to="/" className="Navbar--logo">
                Jobly
            </NavLink>
            <nav className="Navbar--nav">
                <NavLink className="Navbar--nav--link" to="/jobs">
                    Jobs
                </NavLink>
                <NavLink className="Navbar--nav--link" to="/companies">
                    Companies
                </NavLink>
                <NavLink className="Navbar--nav--link" to="/profile">
                    Profile
                </NavLink>
                <NavLink className="Navbar--nav--link" to="/">
                    Logout username
                </NavLink>
            </nav>
        </div>
    );
};

export default Navbar;
