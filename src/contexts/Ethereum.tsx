import detectEthereumProvider from "@metamask/detect-provider";
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
  const [isConnected, setIsConnected] = useState<boolean | undefined>();

  const detectProvider = useCallback(async () => {
    const provider = await detectEthereumProvider();
    if (provider) {
    } else {
      setIsConnected(false);
    }
  }, []);

  useEffect(() => {
    detectProvider();
  }, []);

  return (
    <EthereumContext.Provider value={{ isConnected }}>
      {children}
    </EthereumContext.Provider>
  );
};
