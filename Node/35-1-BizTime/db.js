/** Database setup for BizTime. */

const { Client } = require("pg");

let DB_URI;

if (process.env.NODE_ENV === "test") {
    DB_URI = process.env.TEST_DB;
} else {
    DB_URI = process.env.PROD_DB;
}

let db = new Client({
    connectionString: DB_URI,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
});

db.connect();

module.exports = db;
