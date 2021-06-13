import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
    // the token for interactive with the API will be stored here.
    static token;

    static async request(endpoint, data = {}, method = "get") {
        console.debug("API Call:", endpoint, data, method);

        //there are multiple ways to pass an authorization token, this is how you pass it in the header.
        //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${JoblyApi.token}` };
        const params = method === "get" ? data : {};

        try {
            return (await axios({ url, method, data, params, headers })).data;
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }

    // Individual API routes

    // Companies Routes
    /**
     * Get details on a company by handle. Company's jobs are included.
     * Returns => { handle, name, description, numEmployees, logoUrl, jobs }
     *      where jobs is [{ id, title, salary, equity }, ...]
     */
    static async getCompany(handle) {
        let res = await this.request(`companies/${handle}`);
        return res.company;
    }

    /**
     * Get array of all companies.
     * Returns => [ { handle, name, description, numEmployees, logoUrl }, ...]
     */
    static async getAllCompanies() {
        let res = await this.request(`companies`);
        return res.companies;
    }

    /**
     * Gets array of search results based on query
     * Accepts => query
     * Returns => [ { handle, name, description, numEmployees, logoUrl }, ...]
     */
    static async searchCompanies(data) {
        let res = await this.request(`companies/`, data);
        return res.companies;
    }

    // Jobs Routes
    /**
     * Gets array of all jobs.
     * Returns => [ { id, title, salary, equity, companyHandle, companyName }, ...]
     */
    static async getAllJobs() {
        let res = await this.request(`jobs`);
        return res.jobs;
    }

    /**
     * Applies user to specific job.
     * Accepts => username, jobId
     * Returns => {"applied": jobId}
     */
    static async applyToJob(username, jobId) {
        const method = "post";
        let res = await this.request(
            `users/${username}/jobs/${jobId}`,
            {},
            method
        );
        return res.applied;
    }

    /**
     * Gets array of search results based on query
     * Accepts => query
     * Returns => [ { id, title, salary, equity, companyHandle, companyName }, ...]
     */
    static async searchJobs(data) {
        let res = await this.request(`jobs/`, data);
        return res.jobs;
    }

    // User Routes
    /**
     * Registers user.
     * Accepts => user details object
     *     must include: { username, password, firstName, lastName, email }
     * Returns => JWT token (string)
     */
    static async registerUser(user) {
        const method = "post";
        const data = { ...user };
        let res = await this.request(`auth/register`, data, method);
        JoblyApi.token = res.token;
        return JoblyApi.token;
    }

    /**
     * Login user.
     * Accepts => username, password
     * Returns => JWT token (string)
     */
    static async loginUser(username, password) {
        const method = "post";
        const data = { username, password };
        let res = await this.request(`auth/token`, data, method);
        JoblyApi.token = res.token;
        return JoblyApi.token;
    }

    /**
     * Edit user.
     * Accepts => username and user details object with details to update.
     *      Can include: { firstName, lastName, password, email }
     *          (username cannot be updated)
     * Returns => updated user details object
     *      { username, firstName, lastName, email, isAdmin }
     */
    static async updateUser(username, userData) {
        const method = "patch";
        const data = { ...userData };
        let res = await this.request(`users/${username}`, data, method);
        return res.user;
    }

    /**
     * Get user data.
     * Accepts => username
     * Returns => { username, firstName, lastName, isAdmin, applications }
     *      where applications is { id, title, companyHandle, companyName, state }
     */
    static async getUser(username) {
        let res = await this.request(`users/${username}`);
        return res.user;
    }

    /**
     * Logout user from API.
     * Accepts no params.
     * Returns undefined.
     */
    static async logoutUser() {
        JoblyApi.token = "";
    }
}

export default JoblyApi;
