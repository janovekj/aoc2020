import { PuzzleSolverProps } from "../program.ts";

const partition = (min: number, max: number, operations: boolean[]): number => {
  if (max - min === 1) {
    return operations[0] ? min : max;
  }

  const index = Math.floor((min + max) / 2);

  const [operation, ...ops] = operations;
  return operation ? partition(min, index, ops) : partition(index, max, ops);
};

const getOperations = (s: string) =>
  s.split("").map((command) => /[FL]/.test(command));

const parseBoardingPass = (bp: string) => {
  const rowOps = getOperations(bp.substring(0, 7));
  const colOps = getOperations(bp.substring(7, 10));

  const rowIndex = partition(0, 127, rowOps);
  const colIndex = partition(0, 7, colOps);

  return rowIndex * 8 + colIndex;
};

export const partOne = ({ lines }: PuzzleSolverProps) =>
  lines.map(parseBoardingPass).sort((a, b) => b - a)[0];

export const partTwo = ({ lines }: PuzzleSolverProps) => {
  const seatIds = lines.map(parseBoardingPass).sort();

  let mySeat = 0;
  for (let i = 0; i < seatIds.length; i++) {
    const id = seatIds[i];

    if (seatIds[i + 1] !== id + 1) {
      mySeat = id + 1;
      break;
    }
  }

  return mySeat;
};
