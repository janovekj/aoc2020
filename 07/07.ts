import { PuzzleSolverProps } from "../program.ts";

type Bag = {
  id: string;
  children: Child[];
};

type Child = {
  id: string;
  qty: number;
};

const parseChild = (str: string) => {
  const [, qty, id] = /(\d+) (\w+ \w+) bags?/.exec(str) ?? [];
  return {
    id,
    qty: parseInt(qty),
  };
};

const parseLine = (line: string): Bag => {
  const [parent, rest] = line.split(" bags contain ");

  return {
    id: parent,
    children: rest === "no other bags." ? [] : rest.split(", ").map(parseChild),
  };
};

export const partOne = ({ lines }: PuzzleSolverProps) => {
  const bags = lines.map(parseLine);

  const findHolders = (bagId: string): string[] => {
    const holders = bags
      .filter((bag) => bag.children.some((b) => b.id === bagId))
      .map(({ id }) => id);

    return Array.from(new Set(holders.concat(holders.flatMap(findHolders))));
  };

  return findHolders("shiny gold").length;
};

export const partTwo = ({ lines }: PuzzleSolverProps) => {
  const bags = lines.map(parseLine);

  const bagMap = Object.fromEntries(bags.map((bag) => [bag.id, bag.children]));

  const getChildCount = (children: Child[]): number =>
    children.reduce(
      (total, curr) => total + curr.qty * (1 + getChildCount(bagMap[curr.id])),
      0
    );

  return getChildCount(bagMap["shiny gold"]);
};
