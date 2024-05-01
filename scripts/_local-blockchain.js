import read from "read-file-utf8";

import { contractMap, UnknownContractError } from "./_contracts.js";

export const rpcUrl = "http://localhost:8545";

const anvilConfigPathname = "local-blockchain/anvil-config.json";

/**
 * Relative path of JSON file that contains information about deploy of given
 * contract on local blockchain.
 */
export const getContractDeployInfoPathname = (contractName) => {
  if (contractMap.has(contractName))
    return `local-blockchain/${contractName}.json`;
  throw new UnknownContractError(contractName);
};

/** Read JSON file that contains output of anvil config. */
const getAnvilConfig = async () => {
  const anvilConfig = await read(anvilConfigPathname);
  return anvilConfig;
};

/** Read private keys from anvil config. */
export const getPrivateKeys = async () => {
  const anvilConfig = await getAnvilConfig();

  const privateKeys = anvilConfig.private_keys;
  if (!privateKeys)
    throw new Error(`Cannot get private keys from ${anvilConfigPathname}`);

  return {
    owner: privateKeys[0],
    creator1: privateKeys[1],
    creator2: privateKeys[2],
  };
};
