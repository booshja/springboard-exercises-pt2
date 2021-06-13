import React, { useContext } from "react";
// context
import UserContext from "../../context/UserContext";
// css
import "../../assets/css/JobDetail.css";

const JobDetail = ({ job }) => {
    // get context
    const { apply, applications, user } = useContext(UserContext);
    const handleClick = async () => {
        /**
         * When Apply button clicked:
         * - Send data to API
         * - Change the button to "Applied" and deactivate
         */
        await apply(user.username, job.id);
    };
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
            {applications.indexOf(job.id) === -1 ? (
                <button onClick={handleClick} className="JobDetail--btn">
                    APPLY
                </button>
            ) : (
                <button disabled className="JobDetail--btn--applied">
                    APPLIED
                </button>
            )}
        </div>
    );
};

export default JobDetail;
