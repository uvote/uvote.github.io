import { createConfig, http } from "wagmi";
import { anvil, mainnet, sepolia } from "wagmi/chains";
import { coinbaseWallet, injected } from "wagmi/connectors";

import metadata from "../metadata.json" with { type: 'json' };

export const wagmiProviderConfig = createConfig({
  chains: [anvil, sepolia, mainnet],
  connectors: [
    injected(),
    coinbaseWallet({
      appName: metadata.asciiName,
      preference: {
    keysUrl: 'https://keys-dev.coinbase.com/connect',
		options: 'smartWalletOnly',
      }
    }),
  ],
  transports: {
    [anvil.id]: http('http://localhost:8545'),
    [sepolia.id]: http(),
    [mainnet.id]: http(),
  },
});
