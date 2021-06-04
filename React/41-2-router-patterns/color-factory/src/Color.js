import React from "react";
import { Link, Redirect, useParams } from "react-router-dom";
import "./Color.css";

const Color = ({ checkColor }) => {
    const { color } = useParams();

    const theColor = checkColor(color);

    if (theColor === false) {
        return <Redirect exact to="/colors" />;
    }

    return (
        <div className="Color" style={{ backgroundColor: theColor.colorValue }}>
            <p className="Color--text">This is {theColor.colorName}.</p>
            <p className="Color--text">Isn't it beautiful?</p>
            <Link to="/" className="Color--text">
                Go Back
            </Link>
        </div>
    );
};

export default Color;
