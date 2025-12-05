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
    const raw_ranges = input_data.filter((x) => x.includes("-"));
    let ranges = [];
    for (const range of raw_ranges) {
        const [start, end] = range.split("-", 2);
        ranges.push({ start: parseInt(start), end: parseInt(end) });
    }
    let i = 0;
    let j = 0;
    while (i < ranges.length) {
        j = 0;
        while (j < ranges.length) {
            if (ranges[i] && ranges[j] && i != j) {
                if (
                    ranges[j].start >= ranges[i].start &&
                    ranges[j].start <= ranges[i].end
                ) {
                    ranges[i].end = Math.max(ranges[i].end, ranges[j].end);
                    ranges[j] = null;
                    i = 0;
                    j = 0;
                } else if (
                    ranges[j].end >= ranges[i].start &&
                    ranges[j].end <= ranges[i].end
                ) {
                    ranges[i].start = Math.min(
                        ranges[i].start,
                        ranges[j].start
                    );
                    ranges[j] = null;
                    i = 0;
                    j = 0;
                }
            }
            j++;
        }
        i++;
    }

    return ranges
        .filter((x) => x != null)
        .reduce((acc, curr) => acc + (curr.end - curr.start + 1), 0);
}

const result = main(input);
console.log(result);
