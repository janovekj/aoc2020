export const readInput = (day: string) =>
  Deno.readTextFileSync(`./${day}/${day}.txt`);

export const readLines = (day: string) => readInput(day).split("\n");
