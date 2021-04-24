/** Command-line tool to generate Markov text. */
const { MarkovMachine } = require("./markov");
const axios = require("axios");
const fs = require("fs");

const type = process.argv[2];
const path = process.argv[3];

function cat(path) {
    fs.readFile(path, "utf8", function (err, data) {
        if (err) {
            console.log(`Error reading file ${path}` + "\n" + err);
            process.exit(1);
        } else {
            handleOutput(data);
        }
    });
}

async function webcat(url) {
    try {
        let res = await axios.get(url);
        handleOutput(res.data);
    } catch (e) {
        console.log(`Error reading url ${url}` + "\n" + e);
        process.exit(1);
    }
}

function handleOutput(data) {
    let output = new MarkovMachine(data);
    console.log(output.makeText());
    process.exit(0);
}

if (type === "url") {
    webcat(path);
} else if (type === "file") {
    cat(path);
} else {
    console.log(
        `Error: Invalid input parameter: ${type}. Must be "file" or "url".`
    );
}
