import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
// context
import UserContext from "../../context/UserContext";
// css
import "../../assets/css/Navbar.css";

const Navbar = () => {
    // set up context
    const { user } = useContext(UserContext);
    return (
        <div className="Navbar">
            <NavLink exact to="/" className="Navbar--logo">
                Jobly
            </NavLink>
            <nav className="Navbar--nav">
                {user ? (
                    <>
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
                            Logout {user.username}
                        </NavLink>
                    </>
                ) : (
                    <>
                        <NavLink className="Navbar--nav--link" to="/signup">
                            Sign Up
                        </NavLink>
                        <NavLink className="Navbar--nav--link" to="/login">
                            Log In
                        </NavLink>
                    </>
                )}
            </nav>
        </div>
    );
};

export default Navbar;
