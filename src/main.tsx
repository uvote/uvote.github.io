import "./styles/main.scss";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { WagmiConfig } from "wagmi";

import { I18nContextProvider } from "./contexts/I18n";
import { Router } from "./routing/Router";
import { config } from "./wagmi";

const domNode = document.getElementById("root") as HTMLElement;
const root = createRoot(domNode);
root.render(
  <StrictMode>
    <WagmiConfig config={config}>
      <I18nContextProvider>
        <Router />
      </I18nContextProvider>
    </WagmiConfig>
  </StrictMode>
);
