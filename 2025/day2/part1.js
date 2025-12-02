const fs = require("node:fs");
let input = "";
try {
    const data = fs.readFileSync("input.txt", "utf8");
    if (data) input += data;
} catch {
    const data = fs.readFileSync("2025/day2/input.txt", "utf8");
    if (data) input += data;
}
input = input.split("\n");

function main(input_data) {
    let result = 0;
    const id_ranges = input_data[0].split(",");
    for (const range of id_ranges) {
        let [start, end] = range.split("-");
        start = parseInt(start);
        end = parseInt(end);
        for (let i = start; i <= end; i++) {
            if (!isValidId(i.toString())) {
                result += i;
            }
        }
    }
    return result;
}

function isValidId(id) {
    if (id.length % 2 === 1) return true;
    return id.slice(0, id.length / 2) !== id.slice(id.length / 2);
}

const result = main(input);
console.log(result);
