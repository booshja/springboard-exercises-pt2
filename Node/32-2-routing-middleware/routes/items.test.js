process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("../app");
let items = require("../fakeDb");

let groceryItem = { name: "popsicle", price: 1.45 };

beforeEach(() => items.push(groceryItem));

afterEach(() => (items.length = 0));

describe("GET /items", () => {
    test("Get all items", async () => {
        const res = await request(app).get("/items");
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ items: [groceryItem] });
    });
});

describe("GET /items/:name", () => {
    test("Get item by name", async () => {
        const res = await request(app).get(`/items/${groceryItem.name}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(groceryItem);
    });

    test("Responds with 404 for invalid item", async () => {
        const res = await request(app).get("/items/icecubes");
        expect(res.statusCode).toBe(404);
    });
});

describe("POST /items", () => {
    test("creating an item", async () => {
        const res = await request(app).post("/items").send({
            name: "Blue Cheese",
            price: 10.99,
        });
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({
            added: { name: "Blue Cheese", price: 10.99 },
        });
    });

    test("Responds with 400 if name is missing", async () => {
        const res = await request(app).post("/items").send({});
        expect(res.statusCode).toBe(400);
    });
});

describe("/PATCH /items/:name", () => {
    test("updating the item's name", async () => {
        const res = await request(app)
            .patch(`/items/${groceryItem.name}`)
            .send({ name: "Kimchi", price: 1.45 });
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ updated: { name: "Kimchi", price: 1.45 } });
    });

    test("responds with 404 for invalid name", async () => {
        const res = await request(app)
            .patch(`/items/Piggles`)
            .send({ name: "Whatchamacallit", price: 0.99 });
        expect(res.statusCode).toBe(404);
    });
});

describe("DELETE /items/:name", () => {
    test("deleting an item", async () => {
        const res = await request(app).delete(`/items/${groceryItem.name}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ message: "Deleted" });
    });

    test("Responds with 404 for deleting an invalid item", async () => {
        const res = await request(app).delete("/items/ham");
        expect(res.statusCode).toBe(404);
    });
});
