const fs = require("node:fs");
let input;
try {
    input = fs.readFileSync("input.txt", "utf8");
} catch {
    input = fs.readFileSync("2025/day5/input.txt", "utf8");
}
input = input.split("\n");
input = input.map((x) => x.replace("\r", "")).filter((x) => x);

function main(input_data) {
    let ranges = input_data.filter((x) => x.includes("-"));
    ranges = ranges.map((raw_range) => {
        const [start, end] = raw_range.split("-", 2);
        return { start: parseInt(start), end: parseInt(end) };
    });
    const ingredients_ids = input_data
        .filter((x) => !x.includes("-"))
        .map((x) => parseInt(x));
    let fresh_count = 0;
    for (const id of ingredients_ids) {
        for (const range of ranges) {
            if (id >= range.start && id <= range.end) {
                fresh_count++;
                break;
            }
        }
    }
    return fresh_count;
}

const result = main(input);
console.log(result);
