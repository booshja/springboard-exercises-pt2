import React from "react";
import "../../assets/css/SearchBar.css";

const SearchBar = () => {
    return (
        <form className="SearchBar">
            <input
                type="text"
                id="search"
                name="search"
                placeholder="Enter search term..."
                className="SearchBar--input"
            />
            <button className="SearchBar--btn">Search</button>
        </form>
    );
};

export default SearchBar;
