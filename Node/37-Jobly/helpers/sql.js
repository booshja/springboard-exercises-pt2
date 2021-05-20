const { BadRequestError } = require("../expressError");

function sqlForPartialUpdate(dataToUpdate, jsToSql) {
    // Create an array from the dataToUpdate object's keys
    const keys = Object.keys(dataToUpdate);
    // Throw an error if there is nothing sent to update
    if (keys.length === 0) throw new BadRequestError("No data");

    // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
    // Map an array of keys to use with preventing SQL Injection
    const cols = keys.map(
        (colName, idx) => `"${jsToSql[colName] || colName}"=$${idx + 1}`
    );

    // Return an object with the columns and values to update in the database, ready to plug in to a SQL query
    return {
        setCols: cols.join(", "),
        values: Object.values(dataToUpdate),
    };
}

module.exports = { sqlForPartialUpdate };
