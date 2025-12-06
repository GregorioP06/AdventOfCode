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
    const last_row = input_data[input_data.length - 1];
    let col_start_idx = 0; // salva l'indice a cui è iniziata la colonna
    // Scorri l'ultima riga (dove ci sono gli operatori).
    // Gli operatori indicano l'inizio delle colonne
    for (let j = 1; j < last_row.length; j++) {
        const column = [];
        // se si trova l'inizio di una nuova colonna
        // o se siamo alla fine (ultima colonna)
        if (
            last_row[j] === "+" ||
            last_row[j] === "*" ||
            j === last_row.length - 1
        ) {
            // se è siamo alla fine incrementa j per non perdere l'ultima colonna
            if (j === last_row.length - 1) j += 2;
            for (let i = 0; i < input_data.length; i++) {
                // da ogni riga prendi il pezzo da mettere nella colonna
                // j - 1 per togliere lo spazio inutile
                column.push(input_data[i].slice(col_start_idx, j - 1));
            }
            col_start_idx = j;
            total += solve_column(column);
        }
    }
    return total;
}

function solve_column(column) {
    const numbers = [];
    // scorri l'array verticalmente salvando i numeri così formati in numbers
    for (let j = 0; j < column[0].length; j++) {
        let number = "";
        for (let i = 0; i < column.length - 1; i++) {
            if (column[i][j] !== " ") number = number + column[i][j];
        }
        numbers.push(parseInt(number));
    }
    // applica l'operazione giusta a tutti i numeri
    if (column.at(-1)[0] === "+")
        return numbers.reduce((acc, val) => acc + val);
    else if (column.at(-1)[0] === "*")
        return numbers.reduce((acc, val) => acc * val);
}

const result = main(input);
console.log(result);
