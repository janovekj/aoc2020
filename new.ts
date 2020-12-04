import { format } from "https://deno.land/std@0.79.0/datetime/mod.ts";

const moduleTemplate = `import { PuzzleSolverProps } from "../program.ts";

export const partOne = ({ lines }: PuzzleSolverProps) => {
  return "not implemented";
};

export const partTwo = ({ lines }: PuzzleSolverProps) => {
  return "not implemented";
};
`;

const [argsDay] = Deno.args;

const day = argsDay ?? format(new Date(), "dd");

const dir = `./${day}`;

try {
  Deno.statSync(dir);
  console.log(`Day ${day} already exists`);
} catch (error) {
  Deno.mkdirSync(dir);
  Deno.writeTextFileSync(`${dir}/${day}.ts`, moduleTemplate);
  Deno.writeTextFileSync(`${dir}/${day}.txt`, "");
  console.log(`Created module for ${day}!`);
}
