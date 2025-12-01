const fs = require("node:fs");

let input = "";

try {
    const data = fs.readFileSync("input.txt", "utf8");
    if (data) input += data;
} catch (err) {
    console.error(err);
}

input = input.split("\n");

let current = 50;
let zeros = 0;

for (line of input) {
    const direction = line.slice(0, 1);
    const clicks = Number.parseInt(line.slice(1));

    if (direction === "R") {
        current = (current + clicks) % 100;
    } else {
        current = (current - clicks) % 100;
        if (current < 0) current += 100;
        current = current % 100;
    }

    if (current === 0) {
        zeros += 1;
    }
}

console.log(zeros);
