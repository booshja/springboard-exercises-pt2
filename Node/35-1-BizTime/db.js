/** Database setup for BizTime. */

const { Client } = require("pg");

let DB_URI;

if (process.env.NODE_ENV === "test") {
    DB_URI = process.env.TEST_DB;
    console.log("WE'RE HITTING THE TEST DB!!!!");
    console.log("env => " + process.env.TEST_DB);
    console.log("DB_URI ==> " + DB_URI);
} else {
    DB_URI = process.env.PROD_DB;
}

let db = new Client({
    connectionString: DB_URI,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
});

console.log(DB_URI);

db.connect();

module.exports = db;
