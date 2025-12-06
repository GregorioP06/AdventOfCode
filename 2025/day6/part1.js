const fs = require("node:fs");
let input;
try {
    input = fs.readFileSync("input.txt", "utf8");
} catch {
    input = fs.readFileSync("2025/day6/input.txt", "utf8");
}
input = input.split("\n");
input = input.map((x) => x.replace("\r", "")).filter((x) => x);

function main(input_data) {
    let total = 0;
    let parsed_data = [];
    for (const line of input_data) {
        parsed_data.push(line.split(" ").filter((x) => x));
    }
    // colonne
    for (let j = 0; j < parsed_data[0].length; j++) {
        let col_solution = 0;
        // righe
        if (parsed_data[parsed_data.length - 1][j] === "+") {
            for (let i = 0; i < parsed_data.length - 1; i++) {
                col_solution += parseInt(parsed_data[i][j]);
            }
        } else if (parsed_data[parsed_data.length - 1][j] === "*") {
            col_solution = 1;
            for (let i = 0; i < parsed_data.length - 1; i++) {
                col_solution *= parseInt(parsed_data[i][j]);
            }
        }
        total += col_solution;
    }
    return total;
}

const result = main(input);
console.log(result);
