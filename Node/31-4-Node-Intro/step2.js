const axios = require("axios");
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

async function webcat(url) {
    try {
        const res = await axios.get(url);
        console.log(res.data);
    } catch (e) {
        console.log("Error: URL does not exist");
    }
}

if (arg.includes("http")) {
    webcat(arg);
} else {
    cat(arg);
}
