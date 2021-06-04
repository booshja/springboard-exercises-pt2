import React from "react";
import { Link } from "react-router-dom";

const VendingMachine = () => {
    //component logic
    return (
        <div className="VendingMachine">
            <h1 className="VendingMachine--title">
                HELLO I AM A VENDING MACHING. WHAT WOULD YOU LIKE TO EAT
            </h1>
            <ul className="VendingMachine--links">
                <li>
                    <Link
                        className="VendingMachine--links--link"
                        exact
                        to="/chips"
                    >
                        Chips
                    </Link>
                </li>
                <li>
                    <Link
                        className="VendingMachine--links--link"
                        exact
                        to="/soda"
                    >
                        Soda
                    </Link>
                </li>
                <li>
                    <Link
                        className="VendingMachine--links--link"
                        exact
                        to="/sardines"
                    >
                        Sardines
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default VendingMachine;
