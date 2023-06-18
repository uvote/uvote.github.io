import detectEthereumProvider from "@metamask/detect-provider";
import { MetaMaskInpageProvider } from "@metamask/providers";
import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";

type ContextValue = { isConnected: undefined | boolean };

export const EthereumContext = createContext<ContextValue>({
  isConnected: undefined,
});

EthereumContext.displayName = "EthereumContext";

export const EthereumContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [hasProvider, setHasProvider] = useState<boolean | undefined>();
  const [isConnected, setIsConnected] = useState<boolean | undefined>();

  let provider: MetaMaskInpageProvider | null = null;

  const detectProvider = useCallback(async () => {
    provider = await detectEthereumProvider<MetaMaskInpageProvider>();
    if (provider) {
      setHasProvider(true);
      setIsConnected(provider.isConnected());
    } else {
      setIsConnected(false);
      setHasProvider(false);
    }
  }, []);

  useEffect(() => {
    if (hasProvider) return;
    detectProvider();
  }, [hasProvider]);

  return (
    <EthereumContext.Provider value={{ isConnected }}>
      {children}
    </EthereumContext.Provider>
  );
};
