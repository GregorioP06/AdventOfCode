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
        let last_pos = -1;
        for (let i = 0; i < 12; i++) {
            const candidates = digits.slice(
                last_pos + 1,
                digits.length - (11 - i)
            );
            const chosen = Math.max(...candidates);
            last_pos = candidates.indexOf(chosen) + last_pos + 1;
            total_joltage += chosen * 10 ** (11 - i);
        }
    }
    return total_joltage;
}

const result = main(input);
console.log(result);
