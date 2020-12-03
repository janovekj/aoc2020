const readInput = (day: string) => Deno.readTextFileSync(`./${day}/${day}.txt`);

const [day] = Deno.args;

export interface PuzzleSolverProps {
  raw: string;
  lines: string[];
}

type PuzzleSolver = (props: PuzzleSolverProps) => any;

interface PuzzleDay {
  partOne: PuzzleSolver;
  partTwo: PuzzleSolver;
}

const { partOne, partTwo }: PuzzleDay = await import(`./${day}/${day}.ts`);

const input = readInput(day);
const props: PuzzleSolverProps = {
  raw: input,
  lines: input.split("\n"),
};

console.log(`#---# Day ${day} #---#
Part one: ${partOne(props)}
Part two: ${partTwo(props)}`);
