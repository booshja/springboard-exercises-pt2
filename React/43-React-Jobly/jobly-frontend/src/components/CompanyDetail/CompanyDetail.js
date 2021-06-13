import React from "react";
import { useHistory } from "react-router-dom";
// css
import "../../assets/css/CompanyDetail.css";

const CompanyDetail = ({ company }) => {
    // set up the history object
    const history = useHistory();

    function handleClick() {
        /** Send user to company details page */
        history.push(`/companies/${company.handle}`);
    }

    return (
        <div className="CompanyDetail" onClick={handleClick}>
            <p className="CompanyDetail--name">{company.name}</p>
            <p className="CompanyDetail--desc">{company.description}</p>
            {company.logoUrl ? (
                <img
                    src={company.logoUrl}
                    alt="company logo"
                    className="CompanyDetail--logo"
                />
            ) : null}
        </div>
    );
};

export default CompanyDetail;
