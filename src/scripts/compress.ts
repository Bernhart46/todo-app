export function compressSave(
  state: { [index: string]: any }[],
  type: "compress" | "decompress"
) {
  const keyMap: { [key: string]: string } = type === "compress" ? keys1 : keys2;
  const compressedState: { [p: string]: any }[] = [];
  for (let i = 0; i < state.length; i++) {
    compressedState[i] = {};
    for (let key in state[i]) {
      if (Object.hasOwn(keyMap, key)) {
        if (key === "children" || key === "b") {
          compressedState[i][keyMap[key]] = compressSave(state[i][key], type);
        } else if (key === "sort" || key === "d") {
          compressedState[i][keyMap[key]] = compressSave(
            [state[i][key]],
            type
          )[0];
        } else {
          compressedState[i][keyMap[key]] = state[i][key];
        }
      } else {
        compressedState[i][key] = state[i][key];
      }
    }
  }
  return compressedState;
}

const keys1 = {
  name: "a",
  children: "b",
  description: "c",
  sort: "d",
  not_started: "e",
  in_progress: "f",
  done: "g",
  id: "h",
  status: "i",
  index: "j",
};

const keys2 = {
  a: "name",
  b: "children",
  c: "description",
  d: "sort",
  e: "not_started",
  f: "in_progress",
  g: "done",
  h: "id",
  i: "status",
  j: "index",
};
