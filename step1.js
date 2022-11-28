const fs = require('fs');
const process = require('process');

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

const path = process.argv[2];

cat(path);