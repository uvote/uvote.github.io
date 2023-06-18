import detectEthereumProvider from "@metamask/detect-provider";
import { MetaMaskInpageProvider } from "@metamask/providers";
import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
  useReducer,
  Reducer,
} from "react";

type State = Partial<{
  chainId: string;
  isConnected: boolean;
  provider: MetaMaskInpageProvider | null;
}>;

type SET_CHAIN_ID = {
  type: "SET_CHAIN_ID";
  data: Pick<State, "chainId">;
};

type SET_IS_CONNECTED = {
  type: "SET_IS_CONNECTED";
  data: Pick<State, "isConnected">;
};

type SET_PROVIDER = {
  type: "SET_PROVIDER";
  data: Pick<State, "provider">;
};

type Action = SET_CHAIN_ID | SET_IS_CONNECTED | SET_PROVIDER;

type ContextValue = Pick<State, "isConnected">;

export const EthereumContext = createContext<ContextValue>({
  isConnected: undefined,
});

EthereumContext.displayName = "EthereumContext";

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "SET_CHAIN_ID": {
      return {
        ...state,
        chainId: action.data.chainId,
      };
    }

    case "SET_IS_CONNECTED": {
      return {
        ...state,
        isConnected: action.data.isConnected,
      };
    }

    case "SET_PROVIDER": {
      return {
        ...state,
        provider: action.data.provider,
      };
    }

    default:
      return state;
  }
};

export const EthereumContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [{ chainId, isConnected, provider }, dispatch] = useReducer<
    Reducer<State, Action>
  >(reducer, {});

  const detectProvider = useCallback(async () => {
    if (provider) return;
    const detectedProvider =
      await detectEthereumProvider<MetaMaskInpageProvider>();
    dispatch({
      type: "SET_IS_CONNECTED",
      data: {
        isConnected:
          detectedProvider === null ? false : detectedProvider.isConnected(),
      },
    });
  }, [provider]);

  const requestChainId = useCallback(async () => {
    if (!provider) return;
    const chainId = await provider.request<State["chainId"]>({
      method: "eth_chainId",
    });
    if (!chainId) return;
    dispatch({ type: "SET_CHAIN_ID", data: { chainId } });
  }, [provider]);

  useEffect(() => {
    if (provider === undefined) {
      detectProvider();
    } else if (provider !== null) {
      provider.on("chainChanged", () => {
        window.location.reload();
      });
    }
  }, [provider]);

  useEffect(() => {
    if (chainId) return;
    requestChainId();
  }, [chainId, requestChainId]);

  return (
    <EthereumContext.Provider value={{ isConnected }}>
      {children}
    </EthereumContext.Provider>
  );
};
