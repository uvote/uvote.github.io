import "dotenv/config";

import { defineConfig } from "@wagmi/cli";
import { foundry, react } from "@wagmi/cli/plugins";
import { coinbaseWallet } from "@wagmi/connectors";
import { anvil } from "@wagmi/core/chains";

export default defineConfig(() => {
  return {
    out: "app/wagmi/generated.ts",
    contracts: [],
    plugins: [
      foundry({
        deployments: {
          NicknameRegistry: {
            [anvil.id]: process.env.LOCAL_NICKNAME_REGISTRY_ADDRESS,
          },
          PollFactoryBasic: {
            [anvil.id]: process.env.LOCAL_POLL_FACTORY_BASIC_ADDRESS,
          },
        },
        project: "./contracts",
      }),
      react(),
    ],
  };
});
