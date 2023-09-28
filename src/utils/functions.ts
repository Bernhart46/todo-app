export const calcNewHeight = (value: string) => {
  const numberOfLines = value.split("\n").length;

  console.log("rerendered");

  return numberOfLines * 16 * 1.5;
};
