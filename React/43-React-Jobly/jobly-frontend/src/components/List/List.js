import React from "react";
import JobDetail from "../JobDetail/JobDetail";
// import CompanyDetail from "../CompanyDetail/CompanyDetail";
import "../../assets/css/List.css";

const List = () => {
    return (
        <div className="List">
            {/* <CompanyDetail />
            <CompanyDetail />
            <CompanyDetail /> */}
            <JobDetail />
            <JobDetail />
            <JobDetail />
        </div>
    );
};

export default List;
