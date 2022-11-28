const fs = require('fs');
const process = require('process');
const axios = require('axios');

// handle output: write to file if out given, else print
function handleOutput(text, out) {
    if (out) {
        try {
            fs.writeFileSync(out, text);
            console.log(`Successfully wrote contents to ${out}`);
        } catch (err) {
            console.error(`Couldn't write ${out}: ${err}`);
            process.exit(1);
        }
    } else {
        console.log(text);
    }
}

// read file at path and do output

function cat(path, out) {
    try {
        const contents = fs.readFileSync(path, 'utf8');
        handleOutput(contents, out)
    } catch (err) {
        console.error(`Error reading ${path}: ${err}`);
        process.exit(1);
    }
}

// read page at URL and do output

async function webCat(url, out) {
    try {
        const resp = await axios.get(url);
        handleOutput(resp.data, out)
    } catch (err) {
        console.error(`Error fetching ${url}: ${err}`);
        process.exit(1);
    }
}

let path;
let out;

if (process.argv[2] === '--out') {
    out = process.argv[3];
    path = process.argv[4];
} else {
    path = process.argv[2];
}

// determine if input path is a file path or a web URL and call appropriate function

if (path.includes('http') || path.includes('www')) {
    webCat(path, out);
} else {
    cat(path, out);
}