"use strict";

const db = require("../db");
const { NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");
// const { BadRequestError, NotFoundError } = require("../expressError");
// const { sqlForPartialUpdate } = require("../helpers/sql");

/** Related functions for jobs */

class Job {
    /** Create a job (from data), update db, return new job data.
     *
     *  data should be { title, salary, equity, companyHandle }
     *
     * Returns { id, title, salary, equity, companyHandle }
     */

    static async create(data) {
        const result = await db.query(
            `INSERT INTO jobs (title,
                            salary,
                            equity,
                            company_handle)
            VALUES ($1, $2, $3, $4)
            RETURNING id, title, salary, equity, company_handle AS "companyHandle"`,
            [data.title, data.salary, data.equity, data.companyHandle]
        );
        const job = result.rows[0];

        return job;
    }

    /** Find all jobs.
     *
     * Returns [{ title, salary, equity, companyHandle }, ...]
     */

    static async findAll() {
        const jobsRes = await db.query(
            `SELECT id,
                    title,
                    salary,
                    equity,
                    company_handle AS "companyHandle"
            FROM jobs
            ORDER BY title`
        );
        return jobsRes.rows;
    }

    /** Find jobs with query string filters (title, minSalary, hasEquity)
     *
     * Returns [{id, title, salary, equity, companyHandle }, ...]
     */

    static async filterFind(params) {
        let wheres = [];
        let values = [];
        let idx = 1;

        // Add title to wheres an values if in params
        if (params.title) {
            wheres.push(`title ILIKE $${idx}`);
            values.push("%" + params.title + "%");
            idx += 1;
        }

        // Add minSalary to wheres and values if in params
        if (params.minSalary) {
            wheres.push(`salary >= $${idx}`);
            values.push(+params.minSalary);
            idx += 1;
        }

        // Add hasEquity to wheres if in params
        if (params.hasEquity) {
            wheres.push(`equity > 0.0`);
        }

        // Create string from wheres array
        const sqlWheres = wheres.join(" AND ");

        // Database request
        const jobsRes = await db.query(
            `SELECT id,
                    title,
                    salary,
                    equity,
                    company_handle AS "companyHandle"
            FROM jobs
            WHERE ${sqlWheres}`,
            values
        );
        return jobsRes.rows;
    }

    /** Given a job id, return data about job.
     *
     * Returns { title, salary, equity, companyHandle }
     *
     * Throws NotFoundError if not found
     */

    static async get(id) {
        const jobRes = await db.query(
            `SELECT id,
                    title,
                    salary,
                    equity,
                    company_handle AS "companyHandle"
            FROM jobs
            WHERE id = $1`,
            [id]
        );

        const job = jobRes.rows[0];

        if (!job) throw new NotFoundError(`No job: ${id}`);

        return job;
    }

    /** Update job data with 'data'
     *
     * This is a "parial update" --- it's fine if data doesn't contain all the
     * fields; this only changes the provided ones.
     *
     * Data can include: { title, salary, equity }
     *
     * Returns: { id, title, salary, equity, companyHandle }
     *
     * Throws NotFoundError if not found
     */
    static async update(id, data) {
        const { setCols, values } = sqlForPartialUpdate(data, {
            companyHandle: "company_handle",
        });
        const idVarIdx = "$" + (values.length + 1);

        const querySql = `UPDATE jobs
                        SET ${setCols}
                        WHERE id = ${idVarIdx}
                        RETURNING id,
                                title,
                                salary,
                                equity,
                                company_handle AS "companyHandle"`;
        const result = await db.query(querySql, [...values, id]);
        const job = result.rows[0];

        if (!job) throw new NotFoundError(`No job: ${id}`);

        return job;
    }

    /** Delete given job from database; returns undefined.
     *
     * Throws NotFoundError if company not found.
     */

    static async remove(id) {
        const result = await db.query(
            `DELETE FROM jobs
            WHERE id = $1
            RETURNING id`,
            [id]
        );
        const job = result.rows[0];

        if (!job) throw new NotFoundError(`No job: ${id}`);
    }
}

module.exports = Job;
