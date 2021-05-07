const result = require("dotenv").config();

if (result.error) {
    throw result.error;
}

process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../app");
const db = require("../db");

let testCompany;

afterAll(async () => await db.end());

beforeEach(async () => {
    const companiesResult = await db.query(
        `INSERT INTO companies (code, name, description) VALUES ('spring', 'Springboard', 'Tech bootcamps') RETURNING code, name, description`
    );

    testCompany = companiesResult.rows[0];
});

afterEach(async () => {
    await db.query(`DELETE from companies`);
});

describe("GET /companies", () => {
    test("Returns all companies", async () => {
        const res = await request(app).get("/companies/");

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({
            companies: [{ code: testCompany.code, name: testCompany.name }],
        });
    });
});

describe("GET /compnaies/:code", () => {
    test("Returns a single company", async () => {
        const invoiceRes = await db.query(
            `INSERT INTO invoices (comp_code, amt, paid, add_date, paid_date)
                VALUES ('${testCompany.code}', 99.99 , false, '2021-06-05', null) RETURNING *`
        );
        const testInvoice = invoiceRes.rows[0];

        const res = await request(app).get(`/companies/${testCompany.code}`);

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({
            company: {
                code: testCompany.code,
                description: testCompany.description,
                invoices: [testInvoice.id],
                name: testCompany.name,
            },
        });
    });

    test("Responds with 404 for invalid id", async () => {
        const res = await request(app).get(`/companies/notme`);
        expect(res.statusCode).toBe(404);
    });
});

describe("POST /companies", () => {
    test("Creates a single company", async () => {
        const res = await request(app).post(`/companies`).send({
            code: "neumos",
            name: "Neumos Crystal Ball Reading Room",
            description:
                "Midsize music venue in Seattle featuring up and coming acts.",
        });

        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({
            company: {
                code: "neumos",
                name: "Neumos Crystal Ball Reading Room",
                description:
                    "Midsize music venue in Seattle featuring up and coming acts.",
            },
        });
    });

    test("Returns with 500 for invalid post", async () => {
        const res = await request(app).post(`/companies`).send({
            apple: "banana",
        });

        expect(res.statusCode).toBe(500);
    });
});

describe("PUT /companies/:code", () => {
    test("Updates a single company", async () => {
        const res = await request(app)
            .put(`/companies/${testCompany.code}`)
            .send({
                name: "Barboza",
                description:
                    "The downstairs neighbor to Neumos, holding a capacity of 200 people.",
            });

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({
            company: {
                code: testCompany.code,
                name: "Barboza",
                description:
                    "The downstairs neighbor to Neumos, holding a capacity of 200 people.",
            },
        });
    });
});

describe("DELETE /companies/:code", () => {
    test("Deletes a company", async () => {
        const res = await request(app).delete(`/companies/${testCompany.code}`);

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ status: "deleted" });
    });
});
