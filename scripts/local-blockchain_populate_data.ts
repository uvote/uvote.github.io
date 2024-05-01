/* eslint-disable no-console */
import { exec } from "node:child_process";
import { exit } from "node:process";
import { promisify } from "node:util";

import { PollDetailsBasic } from "_/types/PollDetails";

import { getContractDeployInfo, getPrivateKeys } from "./_local-blockchain.js";

const run = promisify(exec);

const poll1: PollDetailsBasic = {
  title: "I ♥ uVote",
  choiceA: "Yes",
  choiceB: "No",
};

const poll2: PollDetailsBasic = {
  title: "Best blockchain",
  choiceA: "Bitcoin",
  choiceB: "Ethereum",
};

const { deployedTo: pollFactoryBasicAddress } = await getContractDeployInfo(
  "PollFactoryBasic"
);

const createPollBasic = async (
  privateKey: string,
  { title, choiceA, choiceB }: PollDetailsBasic
) => {
  const command = `cast send --private-key ${privateKey} ${pollFactoryBasicAddress} "createPoll(string,string,string)(uint256)" "${title}" "${choiceA}" "${choiceB}"`;
  await run(command);
};

try {
  const privateKeys = await getPrivateKeys();
  const [privateKeyCreator1] = privateKeys;

  // Create polls.

  await createPollBasic(privateKeyCreator1, poll1);
  await createPollBasic(privateKeyCreator1, poll2);

  // Show info.

  const { stdout: numberOfPolls } = await run(
    `cast call ${pollFactoryBasicAddress} "getNumberOfPolls()(uint256)"`
  );
  console.info("numberOfPolls", numberOfPolls);
} catch (error) {
  console.error(error);
  exit(1);
}
