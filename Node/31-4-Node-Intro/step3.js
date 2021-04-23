const axios = require("axios");
const fs = require("fs");
const process = require("process");

function cat(path, out) {
    // Takes a relative filepath, returns the content of it
    fs.readFile(path, "utf8", function (err, data) {
        if (err) {
            console.log(`Error reading ${path}` + "\n" + err);
            process.exit(1);
        } else {
            handleOutput(data, out);
        }
    });
}

async function webcat(url, out) {
    // Takes a url, returns the content of it
    try {
        let res = await axios.get(url);
        handleOutput(res.data, out);
    } catch (e) {
        console.log("Error:", e);
        process.exit(1);
    }
}

function handleOutput(data, writeTo) {
    if (writeTo) {
        fs.writeFile(writeTo, data, "utf8", function (err) {
            if (err) {
                console.log("Error:", err);
                process.exit(1);
            }
        });
    } else {
        console.log(data);
    }
}

const args = process.argv;
let writeTo;
let writeFrom;

if (args[2] == "--out") {
    writeTo = args[3];
    writeFrom = args[4];
} else {
    writeFrom = args[2];
}

if (writeFrom.includes("http")) {
    webcat(writeFrom, writeTo);
} else {
    cat(writeFrom, writeTo);
}
