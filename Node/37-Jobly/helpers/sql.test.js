const { BadRequestError } = require("../expressError");
const { sqlForPartialUpdate } = require("./sql");

goodData = {
    name: "Andes Industries",
    description: "Stellar Web Development company.",
    numEmployees: 1,
};
jsToSql = {
    numEmployees: "num_employees",
    logoUrl: "logo_url",
};
expectedSetCols = '"name"=$1, "description"=$2, "num_employees"=$3';
expectedValues = ["Andes Industries", "Stellar Web Development company.", 1];

describe("sqlForParialUpdate helper function", () => {
    test("works: returns object with data for sql query", () => {
        const { setCols, values } = sqlForPartialUpdate(goodData, jsToSql);
    });

    test("bad request with no data", () => {
        try {
            sqlForPartialUpdate({}, {});
            fail();
        } catch (err) {
            expect(err instanceof BadRequestError).toBeTruthy();
        }
    });
});
