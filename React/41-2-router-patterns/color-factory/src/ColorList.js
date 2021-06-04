import React from "react";
import { Link } from "react-router-dom";
import "./ColorList.css";

const ColorList = ({ colors }) => {
    return (
        <>
            <header className="ColorList--header">
                <h1 className="ColorList--header--headline">
                    Welcome to the color factory.
                </h1>
                <Link to="/colors/new" className="ColorList--header--newColor">
                    Add a color
                </Link>
            </header>
            <main className="ColorList--main">
                {colors ? (
                    <>
                        <h2 className="ColorList--main--headline">
                            Please select a color.
                        </h2>
                        <ul className="ColorList--main--list">
                            {colors.map((color) => (
                                <li
                                    key={color.colorValue}
                                    className="ColorList--main--list--color"
                                >
                                    <Link to={`/colors/${color.colorName}`}>
                                        {color.colorName}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </>
                ) : (
                    <h2 className="ColorList--main--headline">
                        Add a color above.
                    </h2>
                )}
            </main>
        </>
    );
};

export default ColorList;
