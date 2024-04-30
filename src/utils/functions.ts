//This is for calculating the Height of the inputs (example: pressing enter, creating new line)
export const calcNewHeight = (value: string) => {
  const numberOfLines = value.split("\n").length;

  return numberOfLines * 16 * 1.5;
};
