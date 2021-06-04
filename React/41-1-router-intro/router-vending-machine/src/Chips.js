import React from "react";
import { Link } from "react-router-dom";

const Chips = () => {
    return (
        <div>
            <h1>OH LOOK IT'S SOME CHIPS!!!</h1>
            <Link exact to="/">
                GO BACK
            </Link>
        </div>
    );
};

export default Chips;
