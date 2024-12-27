import { createConfig, http } from "wagmi";
import { foundry, mainnet, sepolia } from "wagmi/chains";
import { coinbaseWallet, injected } from "wagmi/connectors";

import * as metadata from "../metadata.json";

const appName = metadata.asciiName;
const RPC_URL = import.meta.env.VITE_RPC_URL;

export const wagmiProviderConfig = createConfig({
  chains: [foundry, sepolia, mainnet],
  connectors: [
    injected(),
    coinbaseWallet({
      appName,
    }),
  ],
  transports: {
    [foundry.id]: http(),
    [sepolia.id]: http(RPC_URL),
    [mainnet.id]: http(RPC_URL),
  },
});
