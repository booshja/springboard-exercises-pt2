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
        `INSERT INTO companies(code, name, description) VALUES('spring', 'Springboard', 'Tech bootcamps') RETURNING code, name, description`
    );

    testCompany = companiesResult.rows[0];

    const invoicesResult = await db.query(
        `INSERT INTO invoices (comp_code, amt, paid, add_date, paid_date)
            VALUES (${testCompany.code}, '$99.99' ,'No', 'today', 'Not Paid') RETURNING id, comp_code, paid, add_date, paid_date`
    );
    testInvoice = invoicesResult.rows[0];
});

afterEach(async () => {
    await db.query(`DELETE FROM companies`);
    await db.query(`DELETE FROM invoices`);
});

describe("GET /invoices", () => {
    test("Returns all invoices", async () => {
        const res = await request(app).get(`/users/${testInvoice.id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ invoices: testInvoice });
    });
});
