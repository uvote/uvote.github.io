import "dotenv/config";

import { defineConfig } from "@wagmi/cli";
import { foundry, react } from "@wagmi/cli/plugins";
import { foundry as foundryChain } from "@wagmi/core/chains";

const NICKNAME_REGISTRY_ADDRESS = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";

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
        },
        project: "./contracts",
      }),
      react(),
    ],
  };
});
