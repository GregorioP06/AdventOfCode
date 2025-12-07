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
    let splits = 0;
    for (let i = 0; i < matrix.length - 1; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            const current_cell = matrix[i][j];
            // caso cella corrente è un beam
            if (current_cell === "|") {
                // caso cella sotto il beam è uno splitter
                if (matrix[i + 1][j] === "^") {
                    splits++;
                    // caso a sx dello splitter è vuoto
                    if (matrix[i + 1][j - 1] === ".") {
                        matrix[i + 1][j - 1] = "|";
                    }
                    // caso a dx dello splitter è vuoto
                    if (matrix[i + 1][j + 1] === ".") {
                        matrix[i + 1][j + 1] = "|";
                    }
                }
                // caso cella sotto il beam è spazio vuoto
                else if (matrix[i + 1][j] === ".") {
                    matrix[i + 1][j] = "|";
                }
            }
        }
    }
    return splits;
}

const result = main(input);
console.log(result);
