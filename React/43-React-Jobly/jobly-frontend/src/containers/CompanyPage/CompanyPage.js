import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// api
import JoblyApi from "../../api";
// components
import List from "../../components/List/List";
// css
import "../../assets/css/CompanyPage.css";

const CompanyPage = () => {
    // get url param
    const { handle } = useParams();
    //set up states
    const [isLoading, setIsLoading] = useState(true);
    const [company, setCompany] = useState({});

    useEffect(() => {
        /** When the component first mounts, get the company from the API */
        async function getComp() {
            let res = await JoblyApi.getCompany(handle);
            setCompany(res);
            setIsLoading(false);
        }
        getComp();
    }, [handle]);

    // if data hasn't loaded, display loading message
    if (isLoading) {
        return <p className="loading">Loading &hellip;</p>;
    }

    return (
        <div className="CompanyPage">
            <h1 className="CompanyPage--name">{company.name}</h1>
            <p className="CompanyPage--desc">{company.description}</p>
            <List items={company.jobs} />
        </div>
    );
};

export default CompanyPage;
