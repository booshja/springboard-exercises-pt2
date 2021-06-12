import React from "react";
import JobDetail from "../JobDetail/JobDetail";
import CompanyDetail from "../CompanyDetail/CompanyDetail";
import "../../assets/css/List.css";

const List = ({ items }) => {
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
