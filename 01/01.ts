import { PuzzleSolverProps } from "../program.ts";

export const partOne = ({ lines }: PuzzleSolverProps) => {
  const numbers = lines.map((line) => parseInt(line));

  const sorted = [...numbers].sort();

  const first = sorted.find((n1) => sorted.some((n2) => n2 === 2020 - n1));

  if (!first) {
    throw new Error("first is undefined");
  }

  const second = 2020 - first;

  const result = first * second;
  return result;
};

export const partTwo = ({ lines }: PuzzleSolverProps) => {
  const numbers = lines.map((line) => parseInt(line));

  const sorted = [...numbers].sort();

  let nums: number[] = [];

  const reversed = [...sorted].reverse();

  for (let i = 0; i < sorted.length; i++) {
    const first = sorted[i];

    for (let j = reversed.length - 1; j >= 0; j--) {
      const second = sorted[j];

      const third = sorted.find((t) => first + second + t === 2020);

      if (third) {
        nums = [first, second, third];
        break;
      }
    }

    if (nums.length) {
      break;
    }
  }
  const result = nums[0] * nums[1] * nums[2];
  return result;
};
