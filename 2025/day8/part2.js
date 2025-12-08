const fs = require("node:fs");
let input;
try {
    input = fs.readFileSync("input.txt", "utf8");
} catch {
    input = fs.readFileSync("2025/day8/input.txt", "utf8");
}
input = input.split("\n");
input = input.map((x) => x.replace("\r", "")).filter((x) => x);

// runtime: ~60s
function main(input_data) {
    const boxes = input_data.map((line) => {
        let [x, y, z] = line.split(",");
        return { x, y, z, connectedTo: [], circuitId: null };
    });
    let nextID = 0;
    while (true) {
        let box1;
        let box2;
        let minDistance = Infinity;
        for (let i = 0; i < boxes.length - 1; i++) {
            for (let j = i + 1; j < boxes.length; j++) {
                const distance = calculateDistance(boxes[i], boxes[j]);
                if (
                    distance < minDistance &&
                    !boxes[i].connectedTo.includes(boxes[j])
                ) {
                    minDistance = distance;
                    box1 = i;
                    box2 = j;
                }
            }
        }
        const assigned = connectBoxes(boxes, box1, box2, nextID);
        if (assigned) nextID++;
        if (boxes.every((box) => box.circuitId === boxes[0].circuitId)) {
            return boxes[box1].x * boxes[box2].x;
        }
    }
}

function calculateDistance(point1, point2) {
    return Math.sqrt(
        (point1.x - point2.x) ** 2 +
            (point1.y - point2.y) ** 2 +
            (point1.z - point2.z) ** 2
    );
}

function connectBoxes(boxes, i, j, nextID) {
    boxes[i].connectedTo.push(boxes[j]);
    boxes[j].connectedTo.push(boxes[i]);
    // merge circuits
    if (boxes[i].circuitId === null && boxes[j].circuitId === null) {
        boxes[i].circuitId = nextID;
        boxes[j].circuitId = nextID;
        return true;
    }
    if (boxes[i].circuitId !== null && boxes[j].circuitId === null) {
        boxes[j].circuitId = boxes[i].circuitId;
        return false;
    }
    if (boxes[i].circuitId === null && boxes[j].circuitId !== null) {
        boxes[i].circuitId = boxes[j].circuitId;
        return false;
    }
    // if both are not null
    function setRecursiveID(box, id) {
        if (box.circuitId === id) return;
        box.circuitId = id;
        for (let i = 0; i < box.connectedTo.length; i++) {
            setRecursiveID(box.connectedTo[i], id);
        }
    }
    setRecursiveID(boxes[j], boxes[i].circuitId);
}

const result = main(input);
console.log(result);
