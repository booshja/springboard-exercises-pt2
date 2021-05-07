/** Server startup for BizTime. */

const result = require("dotenv").config();

if (result.error) {
    throw result.error;
}

const app = require("./app");

app.listen(process.env.PORT, function () {
    console.log(process.env.PORT_MSG);
});
