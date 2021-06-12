import React from "react";
import "../../assets/css/JobDetail.css";

const JobDetail = ({ job }) => {
    return (
        <div className="JobDetail">
            <p className="JobDetail--title">{job.title}</p>
            <p className="JobDetail--company">{job.companyName}</p>
            {job.equity ? (
                <p className="JobDetail--financial">Equity: {job.equity}%</p>
            ) : null}
            {job.salary ? (
                <p className="JobDetail--financial">Salary: ${job.salary}</p>
            ) : null}
            <button className="JobDetail--btn">APPLY</button>
        </div>
    );
};

export default JobDetail;
