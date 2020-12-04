import { PuzzleSolverProps } from "../program.ts";

const requiredKeys = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

export const partOne = ({ raw }: PuzzleSolverProps) => {
  const lines = raw.split("\n\n").map((entry) => entry.split("\n").join(" "));
  const passports = lines.map((line) => {
    const keys = line.split(" ").map((field) => field.split(":")[0]);
    return keys;
  });

  const validPassports = passports.filter((passport) =>
    requiredKeys.every((key) => passport.includes(key))
  );

  return validPassports.length;
};

const isNumberInRange = (str: string, min: number, max: number) => {
  const num = parseInt(str);
  return num >= min && num <= max;
};

const uoms = [
  ["cm", 150, 193],
  ["in", 59, 76],
] as const;

const validateHeight = (h: string) =>
  uoms.some(([unit, min, max]) =>
    isNumberInRange(h.replace(unit, ""), min, max)
  );

const haircolors = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];

export const partTwo = ({ raw }: PuzzleSolverProps) => {
  const lines = raw.split("\n\n").map((entry) => entry.split("\n").join(" "));
  const passports: Record<string, string>[] = lines.map((line) => {
    const object = Object.fromEntries(
      line.split(" ").map((field) => field.split(":"))
    );
    return object;
  });

  const validPassports = passports.filter((passport) => {
    const hasKeys = requiredKeys.every((key) =>
      Object.keys(passport).includes(key)
    );
    return (
      hasKeys &&
      isNumberInRange(passport.byr, 1920, 2002) &&
      isNumberInRange(passport.iyr, 2010, 2020) &&
      isNumberInRange(passport.eyr, 2020, 2030) &&
      validateHeight(passport.hgt) &&
      /^#[0-9a-f]{6}$/.test(passport.hcl) &&
      haircolors.includes(passport.ecl) &&
      /^\d{9}$/.test(passport.pid)
    );
  });

  return validPassports.length;
};
