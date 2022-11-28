const fs = require('fs');
const process = require('process');
const axios = require('axios');

// read file at path and print it out

function cat(path) {
    try {
        const contents = fs.readFileSync(path, 'utf8');
        console.log(contents)
    } catch (err) {
        console.error(`Error reading ${path}: ${err}`);
        process.exit(1);
    }
}

// read page at URL and print it out

async function webCat(url) {
    try {
        const resp = await axios.get(url);
        console.log(resp.data)
    } catch (err) {
        console.error(`Error fetching ${url}: ${err}`);
        process.exit(1);
    }
}

const path = process.argv[2];

// determine if input path is a file path or a web URL and call appropriate function

if (path.includes('http') || path.includes('www')) {
    webCat(path);
} else {
    cat(path);
}