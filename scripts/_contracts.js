import { argv } from "node:process";

/**
 * Map contract name to environment variable that stores its address once
 * deployed.
 */
export const contractMap = new Map()
  .set("NicknameRegistry", "NICKNAME_REGISTRY_ADDRESS")
  .set("PollFactoryMVP", "POLL_FACTORY_MVP_REGISTRY_ADDRESS");

/** Get contract name from first argument. */
export const getContractNameArgument = () => {
  const contractName = argv[2];
  if (!contractName) throw new Error("Missing contractName argument");
  if (contractMap.has(contractName)) return contractName;
  throw new UnknownContractError(contractName);
};

export class UnknownContractError extends Error {
  constructor(contractName) {
    super(`Unknown contract ${contractName}`);
  }
}
