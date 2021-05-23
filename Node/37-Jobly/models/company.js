"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

/** Related functions for companies. */

class Company {
    /** Create a company (from data), update db, return new company data.
     *
     * data should be { handle, name, description, numEmployees, logoUrl }
     *
     * Returns { handle, name, description, numEmployees, logoUrl }
     *
     * Throws BadRequestError if company already in database.
     * */

    static async create({ handle, name, description, numEmployees, logoUrl }) {
        const duplicateCheck = await db.query(
            `SELECT handle
            FROM companies
            WHERE handle = $1`,
            [handle]
        );

        if (duplicateCheck.rows[0])
            throw new BadRequestError(`Duplicate company: ${handle}`);

        const result = await db.query(
            `INSERT INTO companies
            (handle, name, description, num_employees, logo_url)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING handle, name, description, num_employees AS "numEmployees", logo_url AS "logoUrl"`,
            [handle, name, description, numEmployees, logoUrl]
        );
        const company = result.rows[0];

        return company;
    }

    /** Find all companies.
     *
     * Returns [{ handle, name, description, numEmployees, logoUrl }, ...]
     * */

    static async findAll() {
        const companiesRes = await db.query(
            `SELECT handle,
                    name,
                    description,
                    num_employees AS "numEmployees",
                    logo_url AS "logoUrl"
            FROM companies
            ORDER BY name`
        );
        return companiesRes.rows;
    }

    /** Find companies with query string filters (name, minEmployees, maxEmployees)
     *
     * Returns [{handle, name, description, numEmployees, logoUrl }, ...]
     */

    static async filterFind(params) {
        let wheres = [];
        let values = [];
        let idx = 1;

        // Add name to wheres and values if in params
        if (params.name) {
            wheres.push(`name ILIKE $${idx}`);
            values.push("%" + params.name + "%");
            idx += 1;
        }

        // Add parts for where and values arrays
        if (params.minEmployees && params.maxEmployees) {
            if (+params.minEmployees > +params.maxEmployees)
                throw new BadRequestError(
                    "minEmployees cannot be greater than maxEmployees."
                );

            wheres.push(`num_employees BETWEEN $${idx} AND $${idx + 1}`);
            values.push(+params.minEmployees, +params.maxEmployees);
        } else if (params.minEmployees && !params.maxEmployees) {
            wheres.push(`num_employees >= $${idx}`);
            values.push(+params.minEmployees);
        } else if (params.maxEmployees && !params.minEmployees) {
            wheres.push(`num_employees <= $${idx}`);
            values.push(+params.maxEmployees);
        }

        // Create string from wheres array
        const sqlWheres = wheres.join(" AND ");

        // Database request
        const companiesRes = await db.query(
            `SELECT handle,
                    name,
                    description,
                    num_employees AS "numEmployees",
                    logo_url AS "logoUrl"
            FROM companies
            WHERE ${sqlWheres}`,
            values
        );
        return companiesRes.rows;
    }

    /** Given a company handle, return data about company.
     *
     * Returns { handle, name, description, numEmployees, logoUrl, jobs }
     *   where jobs is [{ id, title, salary, equity, companyHandle }, ...]
     *
     * Throws NotFoundError if not found.
     **/

    static async get(handle) {
        const companyRes = await db.query(
            `SELECT handle,
                    name,
                    description,
                    num_employees AS "numEmployees",
                    logo_url AS "logoUrl"
            FROM companies
            WHERE handle = $1`,
            [handle]
        );

        const company = companyRes.rows[0];

        if (!company) throw new NotFoundError(`No company: ${handle}`);

        const jobsRes = await db.query(
            `SELECT id,
                    title,
                    salary,
                    equity
            FROM jobs
            WHERE company_handle = $1`,
            [company.handle]
        );

        const companyWithJobs = {
            handle: company.handle,
            name: company.name,
            description: company.description,
            numEmployees: company.numEmployees,
            logoUrl: company.logoUrl,
            jobs: jobsRes.rows,
        };

        return companyWithJobs;
    }

    /** Update company data with `data`.
     *
     * This is a "partial update" --- it's fine if data doesn't contain all the
     * fields; this only changes provided ones.
     *
     * Data can include: {name, description, numEmployees, logoUrl}
     *
     * Returns {handle, name, description, numEmployees, logoUrl}
     *
     * Throws NotFoundError if not found.
     */

    static async update(handle, data) {
        const { setCols, values } = sqlForPartialUpdate(data, {
            numEmployees: "num_employees",
            logoUrl: "logo_url",
        });
        const handleVarIdx = "$" + (values.length + 1);

        const querySql = `UPDATE companies
                        SET ${setCols}
                        WHERE handle = ${handleVarIdx}
                        RETURNING handle,
                                name,
                                description,
                                num_employees AS "numEmployees",
                                logo_url AS "logoUrl"`;
        const result = await db.query(querySql, [...values, handle]);
        const company = result.rows[0];

        if (!company) throw new NotFoundError(`No company: ${handle}`);

        return company;
    }

    /** Delete given company from database; returns undefined.
     *
     * Throws NotFoundError if company not found.
     **/

    static async remove(handle) {
        const result = await db.query(
            `DELETE
            FROM companies
            WHERE handle = $1
            RETURNING handle`,
            [handle]
        );
        const company = result.rows[0];

        if (!company) throw new NotFoundError(`No company: ${handle}`);
    }
}

module.exports = Company;
