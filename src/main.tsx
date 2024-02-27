import "_/styles/main.scss";

import { I18nContextProvider } from "_/contexts/I18n";
import { Router } from "_/routing/Router";
import { wagmiConfig } from "_/wagmi/config";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { WagmiConfig } from "wagmi";

const domNode = document.getElementById("root") as HTMLElement;
const root = createRoot(domNode);
root.render(
  <StrictMode>
    <WagmiConfig config={wagmiConfig}>
      <I18nContextProvider>
        <Router />
      </I18nContextProvider>
    </WagmiConfig>
  </StrictMode>
);
