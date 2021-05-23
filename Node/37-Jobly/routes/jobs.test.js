"use strict";

const request = require("supertest");

const db = require("../db");
const app = require("../app");
const Job = require("../models/job");

const {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
    u1AdminToken,
    jobsIds,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/********************************** POST /jobs */

describe("POST /jobs", function () {
    const newJob = {
        title: "Best Tester Ever",
        salary: 1000000,
        equity: 0.7,
        companyHandle: "c1",
    };

    test("works: create job as admin", async function () {
        const resp = await request(app)
            .post("/jobs")
            .send(newJob)
            .set("authorization", `Bearer ${u1AdminToken}`);
        expect(resp.statusCode).toEqual(201);
        expect(resp.body).toEqual({
            job: {
                id: expect.any(Number),
                title: "Best Tester Ever",
                salary: 1000000,
                equity: "0.7",
                companyHandle: "c1",
            },
        });
    });

    test("unauthorized as non-admin", async function () {
        const resp = await request(app).post("/jobs").send({
            title: "A Non-Admin Tester",
            salary: 12,
            equity: 0,
            companyHandle: "c1",
        });
        expect(resp.statusCode).toEqual(401);
    });

    test("bad request with invalid data", async function () {
        const resp = await request(app)
            .post("/jobs")
            .send({
                apples: "bananas",
                this: "wrong",
            })
            .set("authorization", `Bearer ${u1AdminToken}`);
        expect(resp.statusCode).toEqual(400);
    });

    test("bad request with missing data", async function () {
        const resp = await request(app)
            .post("/jobs")
            .send({
                title: "An okay tester",
                salary: 1,
            })
            .set("authorization", `Bearer ${u1AdminToken}`);
        expect(resp.statusCode).toEqual(400);
    });
});

/*********************************** GET /jobs */

describe("GET /jobs", function () {
    test("ok for anon", async function () {
        const resp = await request(app).get("/jobs");
        expect(resp.body).toEqual({
            jobs: [
                {
                    id: expect.any(Number),
                    title: "j1",
                    salary: 100,
                    equity: "0.2",
                    companyHandle: "c1",
                },
                {
                    id: expect.any(Number),
                    title: "j2",
                    salary: 200,
                    equity: "0.4",
                    companyHandle: "c2",
                },
                {
                    id: expect.any(Number),
                    title: "j3",
                    salary: 300,
                    equity: "0.6",
                    companyHandle: "c3",
                },
            ],
        });
    });

    test("fails: test next() handler", async function () {
        await db.query("DROP TABLE jobs CASCADE");
        const resp = await request(app).get("/jobs");
        expect(resp.statusCode).toEqual(500);
    });
});

/******************************* GET /jobs/:id */

describe("GET /jobs/:id", function () {
    test("works for anon", async function () {
        const resp = await request(app).get(`/jobs/${jobsIds[0]}`);
        expect(resp.body).toEqual({
            job: {
                id: expect.any(Number),
                title: "j1",
                salary: 100,
                equity: "0.2",
                companyHandle: "c1",
            },
        });
    });

    test("not found for no such job", async function () {
        const resp = await request(app).get(`/jobs/-1`);
        expect(resp.statusCode).toEqual(404);
    });
});

/***************************** PATCH /jobs/:id */

describe("PATCH /jobs/:id", function () {
    test("works for admin", async function () {
        const resp = await request(app)
            .patch(`/jobs/${jobsIds[2]}`)
            .send({
                title: "J3 - Updated",
            })
            .set("authorization", `Bearer ${u1AdminToken}`);
        expect(resp.body).toEqual({
            job: {
                id: expect.any(Number),
                title: "J3 - Updated",
                salary: 300,
                equity: "0.6",
                companyHandle: "c3",
            },
        });
    });

    test("unauth for anon", async function () {
        const resp = await request(app).patch(`/jobs/${jobsIds[2]}`).send({
            title: "J3 - UNAUTH",
        });
        expect(resp.statusCode).toEqual(401);
    });

    test("not found on no such job", async function () {
        const resp = await request(app)
            .patch(`/jobs/-1`)
            .send({
                title: "new nope",
            })
            .set("authorization", `Bearer ${u1AdminToken}`);
        expect(resp.statusCode).toEqual(404);
    });

    test("bad request on id change attempt", async function () {
        const resp = await request(app)
            .patch(`/jobs/${jobsIds[2]}`)
            .send({
                id: 2,
            })
            .set("authorization", `Bearer ${u1AdminToken}`);
        expect(resp.statusCode).toEqual(400);
    });

    test("bad request on invalid data", async function () {
        const resp = await request(app)
            .patch(`/jobs/${jobsIds[2]}`)
            .send({
                equity: "All of it",
            })
            .set("authorization", `Bearer ${u1AdminToken}`);
        expect(resp.statusCode).toEqual(400);
    });
});

/**************************** DELETE /jobs/:id */

describe("DELETE /jobs/:id", function () {
    test("works for admin", async function () {
        const resp = await request(app)
            .delete(`/jobs/${jobsIds[2]}`)
            .set("authorization", `Bearer ${u1AdminToken}`);
        expect(resp.body).toEqual({ deleted: jobsIds[2].toString() });
    });

    test("unauth for anon", async function () {
        const resp = await request(app).delete(`/jobs/${jobsIds[1]}`);
        expect(resp.statusCode).toEqual(401);
    });

    test("not found for no such job", async function () {
        const resp = await request(app)
            .delete(`/jobs/-1`)
            .set("authorization", `Bearer ${u1AdminToken}`);
        expect(resp.statusCode).toEqual(404);
    });
});
