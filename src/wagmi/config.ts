import { createConfig, http } from "wagmi";
import { goerli, mainnet } from "wagmi/chains";
import { coinbaseWallet, injected } from "wagmi/connectors";

import * as metadata from "../metadata.json";

const appName = metadata.asciiName;

export const wagmiConfig = createConfig({
  chains: [mainnet, goerli],
  connectors: [
    injected(),
    coinbaseWallet({
      appName,
    }),
  ],
  transports: {
    [mainnet.id]: http(),
    [goerli.id]: http(),
  },
});
