import React from "react";
import List from "../../components/List/List";
import "../../assets/css/CompanyPage.css";

const CompanyPage = () => {
    return (
        <div className="CompanyPage">
            <h1 className="CompanyPage--name">Company Name</h1>
            <p className="CompanyPage--desc">Company description</p>
            <List />
        </div>
    );
};

export default CompanyPage;
