import read from "read-file-utf8";

import { ContractName } from "./_contracts.js";

type AnvilConfig = {
  available_accounts: string[];
  private_keys: string[];
};

type AnvilContractDeployInfo = {
  deployedTo: string;
};

export const rpcUrl = "http://localhost:8545";

const anvilConfigPathname = "local-blockchain/anvil-config.json";

/**
 * Relative path of JSON file that contains information about deploy of given
 * contract on local blockchain.
 */
export const getContractDeployInfoPathname = (contractName: ContractName) =>
  `local-blockchain/${contractName}.json`;

/** Get information about deploy of given contract on local blockchain. */
export const getContractDeployInfo = (contractName: ContractName) =>
  read<AnvilContractDeployInfo>(getContractDeployInfoPathname(contractName));

/** Read JSON file that contains output of anvil config. */
const getAnvilConfig = async () => {
  const anvilConfig = await read<AnvilConfig>(anvilConfigPathname);
  return anvilConfig;
};

/** Read private keys from anvil config. */
export const getPrivateKeys = async () => {
  const anvilConfig = await getAnvilConfig();

  return anvilConfig.private_keys;
};

/** Read available accounts from anvil config. */
export const getAvailableAccounts = async () => {
  const anvilConfig = await getAnvilConfig();

  return anvilConfig.available_accounts;
};
