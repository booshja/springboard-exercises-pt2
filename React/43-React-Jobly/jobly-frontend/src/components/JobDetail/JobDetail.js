import React from "react";
import "../../assets/css/JobDetail.css";

const JobDetail = () => {
    return (
        <div className="JobDetail">
            <p className="JobDetail--title">Head of badassery</p>
            <p className="JobDetail--company">Corporate Firm #3</p>
            <p className="JobDetail--financial">Equity: 51%</p>
            <p className="JobDetail--financial">Salary: $1 bajillion</p>
            <button className="JobDetail--btn">APPLY</button>
        </div>
    );
};

export default JobDetail;
