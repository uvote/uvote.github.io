import "_/styles/main.scss";

import { I18nContextProvider } from "_/contexts/I18n";
import { Router } from "_/routing/Router";
import { wagmiConfig } from "_/wagmi/config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Buffer } from "buffer";
import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { WagmiProvider } from "wagmi";

globalThis.Buffer = Buffer;
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <I18nContextProvider>
          <Router />
          <Toaster position="bottom-right" />
        </I18nContextProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);
