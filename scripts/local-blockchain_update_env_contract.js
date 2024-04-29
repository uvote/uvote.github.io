/* eslint-disable no-console */
import { existsSync } from "node:fs";
import { EOL } from "node:os";
import { exit } from "node:process";

import read from "read-file-utf8";
import write from "write-file-utf8";

import { contractMap, getContractNameArgument } from "./_contracts.js";
import { getContractDeployInfoPathname } from "./_local-blockchain.js";

try {
  const contractName = getContractNameArgument();
  const environmentVariableName = contractMap.get(contractName);

  // Read contract deploy related info.

  const contractDeployInfo = await read(
    getContractDeployInfoPathname(contractName)
  );
  const contractAddress = contractDeployInfo.deployedTo;

  // Read .env file, if any. Fallback to .example.env file.

  const envExists = existsSync(".env");
  const envContent = await read(envExists ? ".env" : ".example.env");

  const previousRows = envContent.split(EOL);
  const updatedRows = [];

  let foundRow = false;
  const newRow = `${environmentVariableName}=${contractAddress}`;

  for (const row of previousRows) {
    // Substitute environment variable related row with contract address value,
    if (row.startsWith(environmentVariableName)) {
      updatedRows.push(newRow);
      foundRow = true;
    } else {
      // otherwise copy row as is.
      updatedRows.push(row);
    }
  }

  // If no environment variable related row was found, create a new one.
  if (!foundRow) updatedRows.push(newRow);

  // Write .env file with updated rows.

  await write(".env", updatedRows.join(EOL));
} catch (error) {
  console.error(error);
  exit(1);
}
