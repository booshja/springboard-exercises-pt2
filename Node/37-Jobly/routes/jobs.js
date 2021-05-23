"use strict";

/** Routes for jobs. */

const jsonschema = require("jsonschema");

const express = require("express");
const {
    ensureLoggedIn,
    ensureAdmin,
    ensureAdminOrCurrUser,
} = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
const Job = require("../models/job");

const router = express.Router();

/** POST / { job } => { job }
 *
 * Adds a new job.
 *
 * This returns the newly created job and returns the job and details:
 *   { job: { title, salary, equity, companyHandle } }
 *
 * Authorization Required:
 */

router.post("/", async function (req, res, next) {
    try {
        // const validator = jsonschema.validate(req.body, jobNewSchema);
        // if (!validator.valid) {
        //     const errs = validator.errors.map((e) => e.stack);
        //     throw new BadRequestError(errs);
        // }

        const job = await Job.create(req.body);
        return res.status(201).json({ job });
    } catch (err) {
        return next(err);
    }
});

module.exports = router;
