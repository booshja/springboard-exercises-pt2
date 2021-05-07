const result = require("dotenv").config();

if (result.error) {
    throw result.error;
}

process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../app");
const db = require("../db");

let testCompany;
let testInvoice;

afterAll(async () => {
    await db.end();
});

beforeEach(async () => {
    const companiesResult = await db.query(
        `INSERT INTO companies (code, name, description) VALUES ('spring', 'Springboard', 'Tech bootcamps') RETURNING code, name, description`
    );

    testCompany = companiesResult.rows[0];

    const invoicesResult = await db.query(
        `INSERT INTO invoices (comp_code, amt, paid, add_date, paid_date)
                VALUES ('${testCompany.code}', 99.99 , false, '2021-06-05', null) RETURNING *`
    );

    testInvoice = invoicesResult.rows[0];
});

afterEach(async () => {
    await db.query(`DELETE FROM companies`);
    await db.query(`DELETE FROM invoices`);
});

describe("GET /invoices", () => {
    test("Returns all invoices", async () => {
        const res = await request(app).get("/invoices/");
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({
            invoices: [
                { id: testInvoice.id, comp_code: testInvoice.comp_code },
            ],
        });
    });
});

describe("GET /invoices/:id", () => {
    test("Returns a single invoice", async () => {
        const res = await request(app).get(`/invoices/${testInvoice.id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({
            invoice: expect.any(Object),
        });
    });

    test("Responds with 404 for invlaid id", async () => {
        const res = await request(app).get(`/invoices/0`);
        expect(res.statusCode).toBe(404);
    });
});

describe("POST /invoices", () => {
    test("Creates a single invoice", async () => {
        const res = await request(app).post(`/invoices`).send({
            comp_code: "spring",
            amt: 7.02,
        });

        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({ invoice: expect.any(Object) });
    });
});

describe("PUT /invoices/id", () => {
    test("Updates a single invoice", async () => {
        const res = await request(app).put(`/invoices/${testInvoice.id}`).send({
            amt: 33.33,
        });

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ invoice: expect.any(Object) });
    });

    test("Responds with 404 for invalid id", async () => {
        const res = await request(app).put(`/invoices/0`).send({
            amt: 0.99,
        });

        expect(res.statusCode).toBe(404);
    });
});

describe("DELETE /invoices/id", () => {
    test("Deletes an invoice", async () => {
        const res = await request(app).delete(`/invoices/${testInvoice.id}`);

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ status: "deleted" });
    });
});
