import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
// context
import UserContext from "../../context/UserContext";
// css
import "../../assets/css/Navbar.css";

const Navbar = () => {
    // set up context and history object
    const { user, logout } = useContext(UserContext);
    const history = useHistory();

    const handleClick = async () => {
        /**
         * When user clicks logout
         * - Invoke logout function passed from context
         * - Send user to "/"
         */
        await logout();
        history.push("/");
    };
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
                        <button
                            className="Navbar--nav--link logout"
                            onClick={handleClick}
                        >
                            Logout {user.username}
                        </button>
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
