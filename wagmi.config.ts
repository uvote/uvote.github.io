import "dotenv/config";

import { defineConfig } from "@wagmi/cli";
import { foundry, react } from "@wagmi/cli/plugins";
import { foundry as foundryChain } from "@wagmi/core/chains";

export default defineConfig(() => {
  return {
    out: "src/wagmi/generated.ts",
    contracts: [],
    plugins: [
      foundry({
        deployments: {
          NicknameRegistry: {
            [foundryChain.id]: process.env.NICKNAME_REGISTRY_ADDRESS,
          },
          PollFactoryMVP: {
            [foundryChain.id]: process.env.POLL_FACTORY_MVP_REGISTRY_ADDRESS,
          },
        },
        project: "./contracts",
      }),
      react(),
    ],
  };
});
