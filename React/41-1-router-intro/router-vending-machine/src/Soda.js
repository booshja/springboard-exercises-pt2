import React from "react";
import { Link } from "react-router-dom";

const Soda = () => {
    return (
        <div>
            <h1>OMG SUGARRRRRRRR</h1>
            <Link exact to="/">
                GO BACK
            </Link>
        </div>
    );
};

export default Soda;
