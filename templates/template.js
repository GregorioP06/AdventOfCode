const fs = require("node:fs");
let input = "";
try {
    const data = fs.readFileSync("input.txt", "utf8");
    if (data) input += data;
} catch {
    const data = fs.readFileSync("2025/dayX/input.txt", "utf8");
    if (data) input += data;
}
input = input.split("\n");

function main(input_data) {
    // write program here
    // input_data = list of string, one element per line of raw input
    return null;
}

const result = main(input);
console.log(result);
