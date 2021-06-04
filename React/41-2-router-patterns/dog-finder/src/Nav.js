import React from "react";
import { NavLink } from "react-router-dom";
import "./Nav.css";

function Nav({ dogs }) {
    return (
        <nav className="Nav">
            <ul className="Nav--list">
                <li key="home">
                    <NavLink exact to="/dogs" className="Nav--list--link">
                        Home
                    </NavLink>
                </li>
                {dogs.map((doggo) => (
                    <li key={doggo}>
                        <NavLink
                            exact
                            to={`/dogs/${doggo}`}
                            className="Nav--list--link"
                        >
                            {doggo}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default Nav;
