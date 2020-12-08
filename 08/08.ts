import { PuzzleSolverProps } from "../program.ts";

const parseAction = (line: string): Action => {
  const [instruction, value] = line.split(" ");
  return {
    type: instruction as Action["type"],
    value: parseInt(value),
  };
};

type State = {
  status: "executing" | "looped" | "finished";
  history: number[];
  value: number;
  index: number;
};

type Action = {
  type: "jmp" | "acc" | "nop";
  value: number;
};

const bootMachine = (state: State, actions: Action[]): State => {
  const action = actions[state.index];

  if (state.index >= actions.length) {
    return {
      ...state,
      status: "finished",
    };
  }

  if (state.history.includes(state.index)) {
    return {
      ...state,
      status: "looped",
    };
  }

  switch (state.status) {
    case "executing":
      switch (action.type) {
        case "acc":
          return {
            ...state,
            history: [...state.history, state.index],
            value: state.value + action.value,
            index: state.index + 1,
          };
        case "jmp":
          return {
            ...state,
            history: [...state.history, state.index],
            index: state.index + action.value,
          };
        case "nop":
          return {
            ...state,
            history: [...state.history, state.index],
            index: state.index + 1,
          };
      }
    case "finished":
      return state;
    case "looped":
      return state;
  }
};

const run = (actions: Action[]) => {
  let initialState: State = {
    status: "executing",
    history: [],
    index: 0,
    value: 0,
  };

  return actions.reduce(
    (state) =>
      state.status === "executing" ? bootMachine(state, actions) : state,
    initialState
  );
};

export const partOne = ({ lines }: PuzzleSolverProps) => {
  const actions = lines.map(parseAction);

  return run(actions).value;
};

export const partTwo = ({ lines }: PuzzleSolverProps) => {
  const actions = lines.map(parseAction);

  const loopedResult = run(actions);

  const reversedHistory = [...loopedResult.history].reverse();

  const rep = reversedHistory.reduce((acc, index) => {
    if (acc < 0) {
      const repaired: Action[] = actions.map((action, idx) =>
        action.type !== "acc" && index === idx
          ? {
              ...action,
              type: action.type === "jmp" ? "nop" : "jmp",
            }
          : action
      );

      const newAttempt = run(repaired);

      return newAttempt.status === "finished" ? newAttempt.value : -1;
    } else {
      return acc;
    }
  }, -1);

  return rep;
};
