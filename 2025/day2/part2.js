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
    for (let i = 1; i <= Math.floor(id.length / 2); i++) {
        const groups = id.match(new RegExp(".{1," + i + "}", "g"));
        if (groups.every((val) => val === groups[0])) return false;
    }
    return true;
}

const result = main(input);
console.log(result);
