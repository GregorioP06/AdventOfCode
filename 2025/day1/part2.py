input_data = []
try:
    with open("input.txt") as file:
        for line in file:
            line = line.strip()
            if line:
                input_data.append(line)
except FileNotFoundError:
    with open("2025/day1/input.txt") as file:
        for line in file:
            line = line.strip()
            if line:
                input_data.append(line)


def main(input_data):
    current = 50
    zeros = 0

    for line in input_data:
        direction, clicks = line[0], int(line[1:])

        for _ in range(clicks):
            if direction == "R":
                current = (current + 1) % 100
            else:
                current = (current - 1) % 100
                if current < 0:
                    current = (current + 100) % 100

            if current == 0:
                zeros += 1

    return zeros


result = main(input_data)
print(result)
