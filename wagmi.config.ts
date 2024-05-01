import "dotenv/config";

import { defineConfig } from "@wagmi/cli";
import { foundry, react } from "@wagmi/cli/plugins";
import { foundry as foundryChain } from "@wagmi/core/chains";

import { ContractName } from "./scripts/_contracts.js";

type ContractDeployment = Record<number, `0x${string}`>;
const deployments: Record<ContractName, ContractDeployment> = {
  NicknameRegistry: {
    [foundryChain.id]: process.env.LOCAL_NICKNAME_REGISTRY_ADDRESS,
  },
  PollFactoryBasic: {
    [foundryChain.id]: process.env.LOCAL_POLL_FACTORY_BASIC_ADDRESS,
  },
};

export default defineConfig(() => {
  return {
    out: "app/wagmi/generated.ts",
    contracts: [],
    plugins: [
      foundry({
        deployments,
        project: "./contracts",
      }),
      react(),
    ],
  };
});
