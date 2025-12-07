const fs = require("node:fs");
let input;
try {
    input = fs.readFileSync("input.txt", "utf8");
} catch {
    input = fs.readFileSync("2025/day7/input.txt", "utf8");
}
input = input.split("\n");
input = input.map((x) => x.replace("\r", "")).filter((x) => x);

function main(input_data) {
    input_data[0] = input_data[0].replace("S", "|");
    const matrix = input_data.map((line) => line.split(""));
    const memo = {};
    return computeTimeline(matrix, memo) + 1;
}

// brute-force approach (recursion on split) with memoization
// (ends in a few seconds)
function computeTimeline(matrix, memo) {
    if (!matrix) return 0;
    if (!matrix[1]) return 0;

    // --- MEMOIZATION START ---
    // Create a unique key for this specific state.
    // Logic: If we are at the same height (length) and the current row looks
    // exactly the same (beam positions), the outcome will always be identical.
    const key = `${matrix.length}:${matrix[0].join("")}`;

    if (key in memo) {
        return memo[key];
    }
    // --- MEMOIZATION END ---

    let timelines = 1;
    const i = 0;

    for (let j = 0; j < matrix[0].length; j++) {
        const current_cell = matrix[i][j];

        // CASE: Current cell is a beam
        if (current_cell === "|") {
            // CASE: Below is a splitter (^)
            if (matrix[i + 1][j] === "^") {
                // Split Left
                if (matrix[i + 1][j - 1] === ".") {
                    let sx_timeline = structuredClone(matrix);
                    sx_timeline[i + 1][j - 1] = "|";
                    sx_timeline = sx_timeline.slice(1);
                    timelines += computeTimeline(sx_timeline, memo);
                }
                // Split Right
                if (matrix[i + 1][j + 1] === ".") {
                    let dx_timeline = structuredClone(matrix);
                    dx_timeline[i + 1][j + 1] = "|";
                    dx_timeline = dx_timeline.slice(1);
                    timelines += computeTimeline(dx_timeline, memo);
                }
            }
            // CASE: Below is empty space (.)
            else if (matrix[i + 1][j] === ".") {
                matrix[i + 1][j] = "|";
                timelines = computeTimeline(matrix.slice(1), memo);
            }
        }
    }

    memo[key] = timelines;
    return timelines;
}

const result = main(input);
console.log(result);
