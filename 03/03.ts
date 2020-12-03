import { readLines } from "../readInput.ts";

const lines = readLines("03");

const traverse = (xIncrement: number, yIncrement: number) =>
  lines.reduce(
    (acc, curr, index, array) => {
      const y = acc.pos[1] + yIncrement;
      let x = acc.pos[0] + xIncrement;

      if (x >= curr.length) {
        x = x - curr.length;
      }
      if (y >= array.length) {
        return acc;
      }

      const tile = array[y][x];
      return {
        pos: [x, y],
        trees: tile === "#" ? acc.trees + 1 : acc.trees,
      };
    },
    { pos: [0, 0], trees: 0 }
  ).trees;

const partOne = () => traverse(3, 1);
console.log(`Part one: ${partOne()}`);

const partTwo = () => {
  const increments = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
  ];

  const treesProduct = increments.reduce(
    (acc, [xIncrement, yIncrement]) => acc * traverse(xIncrement, yIncrement),
    1
  );

  return treesProduct;
};
console.log(`Part two: ${partTwo()}`);
