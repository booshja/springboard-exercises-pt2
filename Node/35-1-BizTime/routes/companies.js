const express = require("express");
const slugify = require("slugify");
const router = new express.Router();
const db = require("../db");
const ExpressError = require("../expressError");

router.get("/", async (req, res) => {
    try {
        const results = await db.query(
            `SELECT code, name FROM companies ORDER BY name`
        );
        return res.json({ companies: results.rows });
    } catch (e) {
        return next(e);
    }
});

router.get("/:code", async (req, res, next) => {
    try {
        const { code } = req.params;
        const results = await db.query(
            `SELECT * FROM companies WHERE code=$1`,
            [code]
        );
        if (results.rows.length === 0) {
            throw new ExpressError(
                `Can't find company with code of ${code}`,
                404
            );
        }
        const invoiceResults = await db.query(
            `SELECT id FROM invoices WHERE comp_code=$1`,
            [code]
        );
        const company = results.rows[0];
        const invoices = invoiceResults.rows;

        company.invoices = invoices.map((invoice) => invoice.id);

        return res.send({ company: company });
    } catch (e) {
        return next(e);
    }
});

router.post("/", async (req, res, next) => {
    try {
        const { name, description } = req.body;
        const code = slugify(name, { lower: true });
        const results = await db.query(
            `INSERT INTO companies (code, name, description) VALUES ($1, $2, $3) RETURNING code, name, description`,
            [code, name, description]
        );
        if (results.rows.length === 0) {
            throw new ExpressError(`Cannot create company`, 400);
        }
        return res.status(201).json({ company: results.rows[0] });
    } catch (e) {
        return next(e);
    }
});

router.put("/:code", async (req, res, next) => {
    try {
        const { code } = req.params;
        const { name, description } = req.body;
        const results = await db.query(
            `UPDATE companies SET name=$1, description=$2 WHERE code=$3 RETURNING code, name, description`,
            [name, description, code]
        );
        if (results.rows.length === 0) {
            throw new ExpressError(
                `Cannot find company with code of ${code}`,
                404
            );
        }
        return res.send({ company: results.rows[0] });
    } catch (e) {
        return next(e);
    }
});

router.delete("/:code", async (req, res, next) => {
    try {
        const { code } = req.params;
        const results = await db.query(
            "DELETE FROM companies WHERE code=$1 RETURNING code",
            [code]
        );
        if (results.rows.length === 0) {
            throw new ExpressError(
                `Cannot find company with code of ${code}`,
                404
            );
        }
    } catch (e) {
        return next(new ExpressError(e));
    }
    return res.send({ status: "deleted" });
});

module.exports = router;
