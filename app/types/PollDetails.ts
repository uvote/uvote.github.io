// Same as `PollDetailsBasic` struct in PollFactoryBasic.sol
export type PollDetailsBasic = {
  title: string;
  choiceA: string;
  choiceB: string;
};

export const pollDetailsBasic = {
  titleMaxBytesLength: 40,
  choiceMaxBytesLength: 32,
};
