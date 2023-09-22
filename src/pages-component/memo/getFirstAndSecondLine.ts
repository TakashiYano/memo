/* eslint-disable func-style */
export const getFirstAndSecondLine = (str: string) => {
  const [first, second] = str.split("\n").filter(Boolean);
  return [first || "新規メモ", second || "\u00A0"];
};