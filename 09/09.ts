import { PuzzleSolverProps } from "../program.ts";
import { sum } from "../utils.ts";

const findTheInvalidNumber = (numbers: number[]) => {
  const preambleLength = 25;
  const getPreamble = (index: number) =>
    numbers.slice(index - preambleLength, index);

  const invalid = numbers.find((num, idx) => {
    if (idx < preambleLength) {
      return false;
    } else {
      const preamble = getPreamble(idx);

      const n1 = preamble.find((n) => {
        const diff = num - n;
        return preamble.some((m) => m === diff);
      });

      return !n1;
    }
  });

  if (!invalid) {
    throw new Error("WTF");
  }

  return invalid;
};

export const partOne = ({ lines }: PuzzleSolverProps) => {
  const numbers = lines.map((line) => parseInt(line));
  return findTheInvalidNumber(numbers);
};

export const partTwo = ({ lines }: PuzzleSolverProps) => {
  const numbers = lines.map((line) => parseInt(line));
  const invalid = findTheInvalidNumber(numbers);

  let set: number[] = [];

  for (let i = 0; i < numbers.length; i++) {
    const num = numbers[i];

    if (num === invalid) {
      continue;
    }

    for (let j = i; j < numbers.length; j++) {
      const potentialSet = numbers.slice(i, j);
      const summed = potentialSet.reduce(sum, 0);
      if (summed > invalid) {
        break;
      } else if (summed === invalid) {
        set = potentialSet;
        break;
      }
    }

    if (set.length) {
      break;
    }
  }

  return Math.max(...set) + Math.min(...set);
};
