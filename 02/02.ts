import { PuzzleSolverProps } from "../program.ts";

export const partOne = ({ lines }: PuzzleSolverProps) => {
  const validLines = lines.filter((line) => {
    const [, min, max, char, pw] = /^(\d+)-(\d+) (\w): (\w+)$/.exec(line) ?? [];

    const stripped = pw.replace(new RegExp(char, "g"), "");
    const count = pw.length - stripped.length;
    const isValid = count <= parseInt(max) && count >= parseInt(min);
    return isValid;
  });
  return validLines.length;
};

export const partTwo = ({ lines }: PuzzleSolverProps) => {
  const validLines = lines.filter((line) => {
    const [, firstPos, secondPos, char, pw] =
      /^(\d+)-(\d+) (\w): (\w+)$/.exec(line) ?? [];

    const first = pw[parseInt(firstPos) - 1];
    const second = pw[parseInt(secondPos) - 1];

    return [first, second].includes(char) && first !== second;
  });

  return validLines.length;
};
