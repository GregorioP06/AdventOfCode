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
    // scorri l'ultima riga (dove ci sono gli operatori)
    // gli operatori delineano l'inizio della colonna
    const last_row = input_data[input_data.length - 1];
    let last_seen_idx = 0;
    let column = [];
    for (let j = 1; j < last_row.length; j++) {
        if (
            last_row[j] === "+" ||
            last_row[j] === "*" ||
            j === last_row.length - 1
        ) {
            if (j === last_row.length - 1) {
                j = Math.max(...input_data.map((line) => line.length));
            }
            for (let i = 0; i < input_data.length; i++) {
                let row = input_data[i].slice(last_seen_idx, j);
                if (row.at(-1) === " ") column.push(row.slice(0, -1));
                else column.push(row);
            }
            last_seen_idx = j;
            total += solve_column(column);
            column = [];
        }
    }
    return total;
}

function solve_column(column) {
    let numbers = [];
    for (let j = 0; j < column[0].length; j++) {
        let number = "";
        for (let i = 0; i < column.length - 1; i++) {
            if (column[i][j] !== " ") number = number + column[i][j];
        }
        numbers.push(parseInt(number));
    }
    if (column.at(-1)[0] === "+")
        return numbers.reduce((acc, val) => acc + val);
    else if (column.at(-1)[0] === "*")
        return numbers.reduce((acc, val) => acc * val);
}

const result = main(input);
console.log(result);
