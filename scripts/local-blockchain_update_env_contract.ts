/* eslint-disable no-console */
import { exit } from "node:process";

import {
  contractAddressEnvironmentVariableName,
  getContractNameArgument,
} from "./_contracts.js";
import { putEnv } from "./_env.js";
import { getContractDeployInfo } from "./_local-blockchain.js";

try {
  const contractName = getContractNameArgument();
  const environmentVariableName =
    contractAddressEnvironmentVariableName[contractName];
  const { deployedTo: contractAddress } = await getContractDeployInfo(
    contractName
  );

  await putEnv(environmentVariableName, contractAddress);
} catch (error) {
  console.error(error);
  exit(1);
}
