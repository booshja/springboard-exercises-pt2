// "use strict";

// const request = require("supertest");

// const db = require("../db");
// const app = require("../app");
// const Job = require("../models/job");

// const {
//     commonBeforeAll,
//     commonBeforeEach,
//     commonAfterEach,
//     commonAfterAll,
// } = require("./_testCommon");

// beforeAll(commonBeforeAll);
// beforeEach(commonBeforeEach);
// afterEach(commonAfterEach);
// afterAll(commonAfterAll);

// /********************************** POST /jobs */

// describe("POST /jobs", function () {
//     test("works: create job", async function () {
//         const resp = await request(app).post("/jobs").send({
//             title: "Best Tester Ever",
//             salary: 1000000,
//             equity: "1.0",
//             company_handle: "c1",
//         });
//         expect(resp.statusCode).toEqual(201);
//         expect(resp.body).toEqual({
//             job: {
//                 title: "Best Tester Ever",
//                 salary: 1000000,
//                 equity: "1.0",
//                 company_handle: "c1",
//             },
//         });
//     });
// });
