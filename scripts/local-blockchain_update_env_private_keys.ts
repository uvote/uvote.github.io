/* eslint-disable no-console */
import { exit } from "node:process";

import { putEnv } from "./_env.js";
import { getPrivateKeys } from "./_local-blockchain.js";

try {
  const [privateKey] = await getPrivateKeys();

  await putEnv("LOCAL_PRIVATE_KEY", privateKey);
} catch (error) {
  console.error(error);
  exit(1);
}
