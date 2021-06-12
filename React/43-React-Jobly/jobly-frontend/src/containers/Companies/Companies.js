import React, { useEffect, useState } from "react";
// api
import JoblyApi from "../../api";
// components
import SearchBar from "../../components/SearchBar/SearchBar";
import List from "../../components/List/List";
// css
import "../../assets/css/Companies.css";

const Companies = () => {
    // set up states
    const [isLoading, setIsLoading] = useState(true);
    const [companies, setCompanies] = useState([]);

    async function search(searchObj) {
        /** Send search to API, update state with result */
        const query = { name: searchObj.search };
        let res = await JoblyApi.searchCompanies(query);
        setCompanies(res);
    }

    useEffect(() => {
        /** When the component first mounts, get all the companies from the API */
        async function getComps() {
            let res = await JoblyApi.getAllCompanies();
            setCompanies(res);
            setIsLoading(false);
        }
        getComps();
    }, []);

    // if data hasn't loaded, display loading message
    if (isLoading) {
        return <p className="loading">Loading &hellip;</p>;
    }
    return (
        <div className="Companies">
            <h1 className="Companies--title">Companies</h1>
            <SearchBar search={search} />
            <List items={companies} />
        </div>
    );
};

export default Companies;
