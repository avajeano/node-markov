/** Command-line tool to generate Markov text. */

// interface to local file 
const fs = require("fs");

// importing markove file 
const markov = require("./markov");

const axios = require("axios");

const process = require("process");

// generate text from given text using markov machine 
function generateText(text) {
    let mm = new markov.MarkovMachine(text);
    console.log(mm.makeText());
  }

// read file to generate text 
function makeFileText(path) {
    fs.readFile(path, "utf8", (err, data) => {
        if (err) {
            console.log(`cannot read file: ${path}: error: ${err}`);
            process.exit(1);
        } else {
            generateText(data);
        }
    });
}

// read url to generate text
async function makeURLText(url) {
    let resp;

    try {
        resp = await axios.get(url);
    } catch (err) {
        console.log(`cannot read URL: ${url}: error: ${url}`);
        process.exit(1);
    }
    generateText(resp.data)
}

// is it a path or a url?
// extracts the third and fourth command line arguments and assigns them to varaibles method and path
let [method, path] = process.argv.slice(2)

if (method === "file") {
    makeFileText(path);
}

else if (method === "url") {
    makeURLText(path);
}

else {
    console.error(`unknown method: ${method}`);
    process.exit(1)
}