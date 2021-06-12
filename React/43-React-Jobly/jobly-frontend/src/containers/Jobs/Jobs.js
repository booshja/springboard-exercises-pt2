import React from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import List from "../../components/List/List";
import "../../assets/css/Jobs.css";

const Jobs = () => {
    return (
        <div className="Jobs">
            <h1 className="Jobs--title">Jobs</h1>
            <SearchBar />
            <List />
        </div>
    );
};

export default Jobs;
