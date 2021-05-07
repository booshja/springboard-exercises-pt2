const express = require("express");
const router = new express.Router();
const db = require("../db");
const ExpressError = require("../expressError");

function getDate() {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    return `${day.toString()}/${month.toString()}/${year.toString()}`;
}

router.get("/", async (req, res) => {
    try {
        const results = await db.query(
            `SELECT id, comp_code FROM invoices ORDER BY id`
        );
        return res.json({ invoices: results.rows });
    } catch (e) {
        return next(e);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const results = await db.query(`SELECT * FROM invoices WHERE id=$1`, [
            id,
        ]);
        if (results.rows.length === 0) {
            throw new ExpressError(`Cannot find invoice with id of ${id}`, 404);
        }
        return res.send({ invoice: results.rows[0] });
    } catch (e) {
        return next(e);
    }
});

router.post("/", async (req, res, next) => {
    try {
        const { comp_code, amt } = req.body;
        const add_date = getDate();
        const results = await db.query(
            `INSERT INTO invoices (comp_code, amt, paid, add_date, paid_date)
            VALUES ($1,$2,false,'${add_date}',null) RETURNING *`,
            [comp_code, amt]
        );
        return res.status(201).json({ invoice: results.rows[0] });
    } catch (e) {
        return next(new ExpressError(e));
    }
});

router.put("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const { amt } = req.body;
        const results = await db.query(
            `UPDATE invoices SET amt=$1 WHERE id=$2 RETURNING *`,
            [amt, id]
        );
        if (results.rows.length === 0) {
            throw new ExpressError(
                `Can't update invoice with id of ${id}`,
                404
            );
        }
        return res.send({ invoice: results.rows[0] });
    } catch (e) {
        return next(e);
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const results = await db.query(
            `DELETE FROM invoices WHERE id=$1 RETURNING id`,
            [id]
        );
        if (results.rows.length === 0) {
            throw new ExpressError(
                `Cannot find to delete invoice with ID - ${id}`,
                404
            );
        }
    } catch (e) {
        return next(new ExpressError(e, 404));
    }
    return res.send({ status: "deleted" });
});

module.exports = router;
