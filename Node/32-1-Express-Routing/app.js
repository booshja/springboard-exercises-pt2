const express = require("express");
const {
    checkQueryString,
    getMean,
    getMedian,
    getMode,
    prepRes,
} = require("./utils");
const ExpressError = require("./expressError");

const app = express();

app.use(express.json());

app.get("/mean", (req, res, next) => {
    const nums = checkQueryString(req.query);

    if (nums instanceof ExpressError) {
        return next(nums);
    }

    const mean = getMean(nums);

    return res.json(prepRes(mean, "mean"));
});

app.get("/median", (req, res, next) => {
    const nums = checkQueryString(req.query);

    if (nums instanceof ExpressError) {
        return next(nums);
    }

    const median = getMedian(nums);

    return res.json(prepRes(median, "median"));
});

app.get("/mode", (req, res, next) => {
    const nums = checkQueryString(req.query);
    console.log("nums => " + nums);

    if (nums instanceof ExpressError) {
        return next(nums);
    }

    const mode = getMode(nums);

    return res.json(prepRes(mode, "mode"));
});

app.use((req, res, next) => {
    const e = new ExpressError("Page Not Found", 404);
    next(e);
});

app.use(function (err, req, res, next) {
    let status = err.status || 500;
    let message = err.msg;

    return res.status(status).json({ error: { message, status } });
});

app.listen(3000, () => {
    console.log("Server on port 3000!");
});
