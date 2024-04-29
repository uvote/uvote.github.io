import { contractMap, UnknownContractError } from "./_contracts.js";

/**
 * Relative path of JSON file that contains information about deploy of given
 * contract on local blockchain.
 */
export const getContractDeployInfoPathname = (contractName) => {
  if (contractMap.has(contractName))
    return `local-blockchain/${contractName}.json`;
  throw new UnknownContractError(contractName);
};
