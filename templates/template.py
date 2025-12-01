input_data = []
try:
    with open("input.txt") as file:
        for line in file:
            line = line.strip()
            if line:
                input_data.append(line)
except FileNotFoundError:
    with open("2025/dayX/input.txt") as file:
        for line in file:
            line = line.strip()
            if line:
                input_data.append(line)


def main(input_data):
    # write program here
    # input_data: list[str], one element per line of raw input
    return None


result = main(input_data)
print(result)
