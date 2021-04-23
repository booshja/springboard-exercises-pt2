const axios = require("axios");
const process = require("process");
const fs = require("fs");
const arg = process.argv[2];

function cat(path) {
    fs.readFile(path, "utf8", function (err, data) {
        if (err) {
            console.log(`Error reading ${path}` + "\n" + err);
            process.exit(1);
        }
        console.log(data);
    });
}

async function webCat(url) {
    try {
        let res = await axios.get(url);
        console.log(res.data);
    } catch (e) {
        console.log("Error: URL does not exist");
        process.exit(1);
    }
}

if (arg.includes("http")) {
    webCat(arg);
} else {
    cat(arg);
}
