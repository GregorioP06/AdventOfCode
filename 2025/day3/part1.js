const fs = require("node:fs");
let input;
try {
    input = fs.readFileSync("input.txt", "utf8");
} catch {
    input = fs.readFileSync("2025/day3/input.txt", "utf8");
}
input = input.split("\n");
input = input.map((x) => x.replace("\r", "")).filter((x) => x);

function main(input_data) {
    let total_joltage = 0;
    for (const bank of input_data) {
        const digits = bank.split("").map((x) => parseInt(x));

        const candidate_tens = digits.slice(0, -1);
        const tens = Math.max(...candidate_tens);
        const tens_pos = candidate_tens.indexOf(tens);

        const candidate_units = digits.slice(tens_pos + 1);
        const unit = Math.max(...candidate_units);

        total_joltage += tens * 10 + unit;
    }
    return total_joltage;
}

const result = main(input);
console.log(result);
