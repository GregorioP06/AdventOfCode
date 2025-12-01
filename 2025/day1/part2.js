const fs = require("node:fs");
let input = "";
try {
    const data = fs.readFileSync("input.txt", "utf8");
    if (data) input += data;
} catch {
    const data = fs.readFileSync("2025/day1/input.txt", "utf8");
    if (data) input += data;
}
input = input.split("\n");

function main(input_data) {
    let current = 50;
    let zeros = 0;

    for (line of input_data) {
        const direction = line.slice(0, 1);
        const clicks = Number.parseInt(line.slice(1));

        for (let i = clicks; i > 0; i--) {
            if (direction === "R") {
                current = (current + 1) % 100;
            } else {
                current = (current - 1) % 100;
                if (current < 0) {
                    current = (current + 100) % 100;
                }
            }

            if (current === 0) {
                zeros += 1;
            }
        }
    }
    return zeros;
}

const result = main(input);
console.log(result);
