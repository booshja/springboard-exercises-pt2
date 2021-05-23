"use strict";

const db = require("../db");
const Job = require("./job");
const { NotFoundError, BadRequestError } = require("../expressError");
const {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
    jobsIds,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** create */

describe("create", function () {
    let newJob = {
        companyHandle: "c1",
        title: "Test",
        salary: 100,
        equity: "0.1",
    };

    test("works", async function () {
        let job = await Job.create(newJob);
        expect(job).toEqual({
            ...newJob,
            id: expect.any(Number),
        });
    });
});

/************************************* findAll */

describe("findAll", function () {
    test("works: no filter", async function () {
        let jobs = await Job.findAll();
        expect(jobs).toEqual([
            {
                id: expect.any(Number),
                title: "Job1",
                salary: 100,
                equity: "0.1",
                companyHandle: "c1",
            },
            {
                id: expect.any(Number),
                title: "Job2",
                salary: 200,
                equity: "0.2",
                companyHandle: "c1",
            },
            {
                id: expect.any(Number),
                title: "Job3",
                salary: 300,
                equity: "0",
                companyHandle: "c1",
            },
            {
                id: expect.any(Number),
                title: "Job4",
                salary: null,
                equity: null,
                companyHandle: "c1",
            },
        ]);
    });
});

/**************************** filtered findAll */

describe("filtered find", function () {
    test("works: exact name filter", async function () {
        const params = { title: "Job1" };
        let jobs = await Job.filterFind(params);
        expect(jobs).toEqual([
            {
                id: expect.any(Number),
                title: "Job1",
                salary: 100,
                equity: "0.1",
                companyHandle: "c1",
            },
        ]);
    });

    test("works: partial name filter", async function () {
        const params = { title: "1" };
        let jobs = await Job.filterFind(params);
        expect(jobs).toEqual([
            {
                id: expect.any(Number),
                title: "Job1",
                salary: 100,
                equity: "0.1",
                companyHandle: "c1",
            },
        ]);
    });

    test("works: minSalary filter", async function () {
        const params = { minSalary: 300 };
        let jobs = await Job.filterFind(params);
        expect(jobs).toEqual([
            {
                id: expect.any(Number),
                title: "Job3",
                salary: 300,
                equity: "0",
                companyHandle: "c1",
            },
        ]);
    });

    test("works: hasEquity filter", async function () {
        const params = { hasEquity: true };
        let jobs = await Job.filterFind(params);
        expect(jobs).toEqual([
            {
                id: expect.any(Number),
                title: "Job1",
                salary: 100,
                equity: "0.1",
                companyHandle: "c1",
            },
            {
                id: expect.any(Number),
                title: "Job2",
                salary: 200,
                equity: "0.2",
                companyHandle: "c1",
            },
        ]);
    });
});

/***************************************** get */

describe("get", function () {
    test("works", async function () {
        let job = await Job.get(jobsIds[0]);
        expect(job).toEqual({
            title: "Job1",
            salary: 100,
            equity: "0.1",
            companyHandle: "c1",
            id: expect.any(Number),
        });
    });

    test("not found if no such job", async function () {
        try {
            await Job.get(-1);
            fail();
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy();
        }
    });
});

/************************************** update */

describe("update", function () {
    const updateData = {
        title: "Updated Title",
        salary: 1,
        equity: "0.9",
    };

    test("works", async function () {
        let job = await Job.update(jobsIds[1], updateData);
        expect(job).toEqual({
            id: jobsIds[1],
            companyHandle: "c1",
            ...updateData,
        });

        const result = await db.query(
            `SELECT id, title, salary, equity, company_handle AS "companyHandle" FROM jobs WHERE id = ${jobsIds[1]}`
        );
        expect(result.rows).toEqual([
            {
                id: jobsIds[1],
                title: "Updated Title",
                salary: 1,
                equity: "0.9",
                companyHandle: "c1",
            },
        ]);
    });

    test("not found if no such job", async function () {
        try {
            await Job.update(-1, { title: "No such job" });
            fail();
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy();
        }
    });

    test("bad request with no data", async function () {
        try {
            await Job.update(jobsIds[2], {});
            fail();
        } catch (err) {
            expect(err instanceof BadRequestError).toBeTruthy();
        }
    });
});

/************************************** remove */

describe("remove", function () {
    test("works", async function () {
        await Job.remove(jobsIds[2]);
        const res = await db.query(
            `SELECT id FROM jobs WHERE id=${jobsIds[2]}`
        );
        expect(res.rows.length).toEqual(0);
    });

    test("not found if no such company", async function () {
        try {
            await Job.remove(-1);
            fail();
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy();
        }
    });
});
