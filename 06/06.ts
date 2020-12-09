import { PuzzleSolverProps } from "../program.ts";
import { sum } from "../utils.ts";

export const partOne = ({ raw }: PuzzleSolverProps) => {
  const groups = raw.split("\n\n");
  const yesses = groups
    .map((group) => new Set(group.replaceAll("\n", "").split("")).size)
    .reduce(sum, 0);
  return yesses;
};

export const partTwo = ({ raw }: PuzzleSolverProps) => {
  const groups = raw.split("\n\n");

  const count = groups
    .map((group) => {
      const uniqueYesses = Array.from(
        new Set(group.replaceAll("\n", "").split(""))
      );

      const members = group.split("\n").map((member) => member.split(""));

      const everyoneYes = uniqueYesses.filter((yes) => {
        return members.every((member) => member.includes(yes));
      });

      return everyoneYes.length;
    })
    .reduce(sum, 0);

  return count;
};
