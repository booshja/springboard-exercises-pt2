import React, { useState } from "react";
// css
import "../../assets/css/SearchBar.css";

const SearchBar = ({ search }) => {
    // create blank slate for initial state
    const INITIAL_STATE = { name: "" };

    // set up state
    const [formData, setFormData] = useState(INITIAL_STATE);

    const handleChange = (e) => {
        /** On form input change, update the value in state */
        const { name, value } = e.target;
        setFormData((formData) => ({
            ...formData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        /**
         * When form submits:
         * - Prevent reload of page
         * - Send query to search
         * - Clean the form inputs via state
         */
        e.preventDefault();
        await search({ ...formData });
        setFormData(INITIAL_STATE);
    };

    return (
        <form className="SearchBar" onSubmit={handleSubmit}>
            <input
                type="text"
                id="search"
                name="search"
                placeholder="Enter search term..."
                onChange={handleChange}
                className="SearchBar--input"
            />
            <button className="SearchBar--btn">Search</button>
        </form>
    );
};

export default SearchBar;
