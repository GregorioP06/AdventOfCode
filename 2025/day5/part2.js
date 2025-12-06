const fs = require("node:fs");
let input;
try {
    input = fs.readFileSync("input.txt", "utf8");
} catch {
    input = fs.readFileSync("2025/day5/input.txt", "utf8");
}
input = input.split("\n");
input = input.map((x) => x.replace("\r", "")).filter((x) => x);

function main(input_data) {
    // prendi tutti i range (ignora gli ingredienti)
    let ranges = input_data.filter((x) => x.includes("-"));
    ranges = ranges.map((raw_range) => {
        const [start, end] = raw_range.split("-", 2);
        return { start: parseInt(start), end: parseInt(end) };
    });

    // ordina i range per inizio (serve per unirli efficientemente)
    ranges.sort((a, b) => a.start - b.start);

    /*
    Logica del merge dei range
    Se il range corrente finisce dopo l'inizio del prossimo:
        l'inizio del prossimo diventa l'inizio del corrente
        la fine del prossimo diventa il massimo tra quella del corrente e del prossimo
        metti a null il range corrente
    
        disegno:
            caso 1:
            ------------            corrente
               -------------        prossimo
            ->
            ----------------        uniti

            caso 2:
            ----------------------  corrente
               ---------            prossimo
            ->
            ----------------------  uniti
    */
    for (let i = 0; i < ranges.length - 1; i++) {
        if (ranges[i]) {
            if (ranges[i].end >= ranges[i + 1].start) {
                ranges[i + 1].start = ranges[i].start;
                ranges[i + 1].end = Math.max(ranges[i].end, ranges[i + 1].end);
                ranges[i] = null;
            }
        }
    }

    return ranges
        .filter((x) => x != null)
        .reduce((acc, curr) => acc + (curr.end - curr.start + 1), 0);
}

const result = main(input);
console.log(result);
