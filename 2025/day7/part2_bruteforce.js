const fs = require("node:fs");
let input;
try {
    input = fs.readFileSync("input.txt", "utf8");
} catch {
    input = fs.readFileSync("2025/day7/test.txt", "utf8");
}
input = input.split("\n");
input = input.map((x) => x.replace("\r", "")).filter((x) => x);

function main(input_data) {
    input_data[0] = input_data[0].replace("S", "|");
    const matrix = input_data.map((line) => line.split(""));
    return computeTimeline(matrix) + 1; // off-by-one error :D
}

// brute-force approach (recursion on split)
// (doesn't end)
function computeTimeline(matrix) {
    if (!matrix) return 0;
    if (!matrix[1]) return 0;
    let timelines = 1;
    const i = 0;
    for (let j = 0; j < matrix[0].length; j++) {
        const current_cell = matrix[i][j];
        // caso cella corrente è un beam
        if (current_cell === "|") {
            // caso cella sotto il beam è uno splitter
            if (matrix[i + 1][j] === "^") {
                // caso a sx dello splitter è vuoto
                if (matrix[i + 1][j - 1] === ".") {
                    let sx_timeline = structuredClone(matrix);
                    sx_timeline[i + 1][j - 1] = "|";
                    sx_timeline = sx_timeline.slice(1);
                    timelines += computeTimeline(sx_timeline);
                }
                // caso a dx dello splitter è vuoto
                if (matrix[i + 1][j + 1] === ".") {
                    let dx_timeline = structuredClone(matrix);
                    dx_timeline[i + 1][j + 1] = "|";
                    dx_timeline = dx_timeline.slice(1);
                    timelines += computeTimeline(dx_timeline);
                }
            }
            // caso cella sotto il beam è spazio vuoto
            else if (matrix[i + 1][j] === ".") {
                matrix[i + 1][j] = "|";
                matrix = matrix.slice(1);
                timelines = computeTimeline(matrix);
            }
        }
    }

    return timelines;
}

const result = main(input);
console.log(result);
