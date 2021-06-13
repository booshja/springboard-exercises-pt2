import React from "react";
// components
import JobDetail from "../JobDetail/JobDetail";
import CompanyDetail from "../CompanyDetail/CompanyDetail";
// css
import "../../assets/css/List.css";

const List = ({ items }) => {
    // determine whether it's a list of companies or jobs
    let companies;
    if ("handle" in items[0]) {
        companies = true;
    } else {
        companies = false;
    }
    return (
        <div className="List">
            {items.map((item) =>
                companies ? (
                    <CompanyDetail company={item} key={item.handle} />
                ) : (
                    <JobDetail job={item} key={item.id} />
                )
            )}
        </div>
    );
};

export default List;
