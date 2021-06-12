import React from "react";
import "../../assets/css/CompanyDetail.css";

const CompanyDetail = ({ company }) => {
    return (
        <div className="CompanyDetail">
            <p className="CompanyDetail--name">{company.name}</p>
            <p className="CompanyDetail--desc">{company.description}</p>
            {company.logo ? (
                <img src={company.logoUrl} alt="company logo" />
            ) : null}
        </div>
    );
};

export default CompanyDetail;
