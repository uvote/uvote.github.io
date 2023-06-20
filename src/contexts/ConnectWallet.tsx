import { createContext, FC, PropsWithChildren, useState } from "react";

type ContextValue = {
  connectWalletModalIsActive: boolean;
  setConnectWalletModalIsActive: (isActive: boolean) => void;
};

export const ConnectWalletContext = createContext<ContextValue>({
  connectWalletModalIsActive: false,
  setConnectWalletModalIsActive: () => {},
});

ConnectWalletContext.displayName = "ConnectWalletContext";

export const ConnectWalletContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [connectWalletModalIsActive, setConnectWalletModalIsActive] =
    useState(false);
  return (
    <ConnectWalletContext.Provider
      value={{ connectWalletModalIsActive, setConnectWalletModalIsActive }}
    >
      {children}
    </ConnectWalletContext.Provider>
  );
};
