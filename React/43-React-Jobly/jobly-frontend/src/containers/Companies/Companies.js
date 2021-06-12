import React from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import List from "../../components/List/List";
import "../../assets/css/Companies.css";

const Companies = () => {
    return (
        <div className="Companies">
            <h1 className="Companies--title">Companies</h1>
            <SearchBar />
            <List />
        </div>
    );
};

export default Companies;
