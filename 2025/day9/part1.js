const fs = require("node:fs");
let input;
try {
    input = fs.readFileSync("input.txt", "utf8");
} catch {
    input = fs.readFileSync("2025/day9/input.txt", "utf8");
}
input = input.split("\n");
input = input.map((x) => x.replace("\r", "")).filter((x) => x);

function main(input_data) {
    const coords = input_data.map((line) => {
        const [x, y] = line.split(",", 2);
        return { x: parseInt(x), y: parseInt(y) };
    });

    let max = -Infinity;
    for (let i = 0; i < coords.length; i++) {
        for (let j = 0; j < coords.length; j++) {
            const area =
                (Math.abs(coords[i].x - coords[j].x) + 1) *
                (Math.abs(coords[i].y - coords[j].y) + 1);
            if (area > max) max = area;
        }
    }

    return max;
}

const result = main(input);
console.log(result);

// 4733430820 wrong
