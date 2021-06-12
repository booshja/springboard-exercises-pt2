import React, { useEffect, useState } from "react";
// api
import JoblyApi from "../../api";
// components
import SearchBar from "../../components/SearchBar/SearchBar";
import List from "../../components/List/List";
// css
import "../../assets/css/Jobs.css";

const Jobs = () => {
    // set up states
    const [isLoading, setIsLoading] = useState(true);
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        /** When the component first mounts, get all the jobs from the API */
        async function getJobs() {
            let res = await JoblyApi.getAllJobs();
            setJobs(res);
            setIsLoading(false);
        }
        getJobs();
    }, []);

    // if data hasn't loaded, display loading message
    if (isLoading) {
        return <p className="loading">Loading &hellip;</p>;
    }
    return (
        <div className="Jobs">
            <h1 className="Jobs--title">Jobs</h1>
            <SearchBar />
            <List items={jobs} />
        </div>
    );
};

export default Jobs;
