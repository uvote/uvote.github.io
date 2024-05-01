import { argv } from "node:process";

import { isLiteralType } from "minimal-type-guard-helpers";

import { EnvironmentVariableName } from "./_env.js";

const contractNames = ["NicknameRegistry", "PollFactoryBasic"] as const;
export type ContractName = (typeof contractNames)[number];
const isContractName = isLiteralType<ContractName>(contractNames);

/**
 * Map contract name to environment variable that stores its address once
 * deployed.
 */
export const contractAddressEnvironmentVariableName: Record<
  ContractName,
  EnvironmentVariableName
> = {
  NicknameRegistry: "LOCAL_NICKNAME_REGISTRY_ADDRESS",
  PollFactoryBasic: "LOCAL_POLL_FACTORY_BASIC_ADDRESS",
};

/** Get contract name from first argument. */
export const getContractNameArgument = (): ContractName => {
  const contractName = argv[2];
  if (!contractName) throw new Error("Missing contractName argument");
  if (isContractName(contractName)) return contractName;
  throw new Error(`Unknown contract ${contractName}`);
};
