const fs = require("node:fs");
let input;
try {
    input = fs.readFileSync("test.txt", "utf8");
} catch {
    input = fs.readFileSync("2025/day4/input.txt", "utf8");
}
input = input.split("\n");
input = input.map((x) => x.replace("\r", "")).filter((x) => x);

function main(input_data) {
    let accessible_rolls = 0;
    let accessed;
    do {
        accessed = false;
        for (let i = 0; i < input_data.length; i++) {
            for (let j = 0; j < input_data[0].length; j++) {
                if (input_data[i][j] === "@" && is_accessible(input, i, j)) {
                    accessible_rolls += 1;
                    accessed = true;
                    input_data[i] =
                        input_data[i].slice(0, j) +
                        "." +
                        input_data[i].slice(j + 1);
                }
            }
        }
    } while (accessed);
    return accessible_rolls;
}

function is_accessible(input, x, y) {
    let adjacent_rolls = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (
                (i !== 0 || j !== 0) &&
                x + i >= 0 &&
                y + j >= 0 &&
                input[x + i] &&
                input[x + i][y + j] === "@"
            )
                adjacent_rolls += 1;
        }
    }
    return adjacent_rolls < 4;
}

const result = main(input);
console.log(result);
