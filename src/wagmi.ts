import { configureChains, createConfig } from "wagmi";
import { foundry, goerli, mainnet } from "wagmi/chains";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { publicProvider } from "wagmi/providers/public";

import * as metadata from "./metadata.json";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    mainnet,
    ...(import.meta.env?.MODE === "development" ? [goerli, foundry] : []),
  ],
  [publicProvider()]
);

export const config = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: metadata.asciiName,
      },
    }),
  ],
  publicClient,
  webSocketPublicClient,
});
