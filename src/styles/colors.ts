export const primaryColors = [
  "primary-a",
  "primary-b",
  "primary-c",
  "primary-d",
] as const;

export type PrimaryColor = (typeof primaryColors)[number];
