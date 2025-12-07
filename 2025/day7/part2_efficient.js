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
    // input data preprocessing
    const matrix = input_data.map((line) => line.split(""));
    for (let i = 0; i < matrix.length; i++) {
        matrix[i] = matrix[i].map((cell) => {
            if (cell === "S") return 1;
            else if (cell === ".") return 0;
            else if (cell === "^") return "^";
        });
    }
    // run the algorithm
    return compute(matrix);
}

// fastest(?) approach (instant)
// Save in each cell the number of timelines that "go into it"
/*
Example of ending state:

0000100   <- the first '1' is where the 'S' was
0000100
0001^10   <- the sides of the splitter can be reached each by 1 timeline
00011^1
0002^11   <- the fourth cell can be reached by 2 timelines.
0002011   <- end: 4 timelines in total
*/
function compute(matrix) {
    // since we look ahead stop before the last line
    for (let i = 0; i < matrix.length - 1; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            // if the current cell is reached by no timelines or is a splitter do nothing
            if (matrix[i][j] === 0 || matrix[i][j] === "^") continue;
            // if the cell below is a splitter
            if (matrix[i + 1][j] === "^") {
                // add the current timelines to the sides of the splitter
                if (matrix[i + 1][j - 1] != undefined) {
                    matrix[i + 1][j - 1] += matrix[i][j];
                }
                if (matrix[i + 1][j + 1] != undefined) {
                    matrix[i + 1][j + 1] += matrix[i][j];
                }
            } else {
                // if the cell below is not a splitter, simply copy the current timelines
                matrix[i + 1][j] += matrix[i][j];
            }
        }
    }
    // sum the number of all timelines that reached the end
    return matrix.at(-1).reduce((acc, val) => acc + val);
}

const result = main(input);
console.log(result);
