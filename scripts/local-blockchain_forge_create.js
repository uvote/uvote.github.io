/* eslint-disable no-console */
import { exec } from "node:child_process";
import { exit } from "node:process";
import { promisify } from "node:util";

import write from "write-file-utf8";

import { getContractNameArgument } from "./_contracts.js";
import {
  getContractDeployInfoPathname,
  getPrivateKeys,
  rpcUrl,
} from "./_local-blockchain.js";

const run = promisify(exec);

try {
  const contractName = getContractNameArgument();
  const { owner: privateKey } = await getPrivateKeys();

  // Run command to deploy contract, notice the `--json` flag.

  const command = `forge create contracts/src/${contractName}.sol:${contractName} --rpc-url ${rpcUrl} --private-key ${privateKey} --json`;
  console.info(command);

  const { stdout } = await run(command);

  // Write the command output to related JSON file.

  await write(getContractDeployInfoPathname(contractName), stdout);
} catch (error) {
  console.error(error);
  exit(1);
}
