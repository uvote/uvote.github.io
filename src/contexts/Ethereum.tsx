import detectEthereumProvider from "@metamask/detect-provider";
import { MetaMaskInpageProvider } from "@metamask/providers";
import {
  createContext,
  FC,
  PropsWithChildren,
  Reducer,
  useCallback,
  useEffect,
  useReducer,
  useRef,
} from "react";

/**
 * Ethereum Provider JavaScript API
 *
 * See {@link https://eips.ethereum.org/EIPS/eip-1193}
 */
type EthereumProviderEIP1193 = {
  request: ({
    method,
  }: {
    readonly method: string;
    readonly params?: readonly unknown[] | object;
  }) => Promise<unknown>;
  on(
    eventName: string,
    listener: (...args: unknown[]) => void
  ): EthereumProviderEIP1193;
};

type MetaMaskEthereumProvider = EthereumProviderEIP1193 &
  Required<Pick<MetaMaskInpageProvider, "isConnected" | "isMetaMask">>;

const isEthereumProviderEIP1193 = (
  arg: unknown
): arg is EthereumProviderEIP1193 => {
  if (!arg || typeof arg !== "object") return false;
  const { on, request } = arg as Partial<EthereumProviderEIP1193>;
  if (typeof on !== "function") return false;
  if (typeof request !== "function") return false;
  return true;
};

const isMetaMaskEthereumProvider = (
  arg: unknown
): arg is MetaMaskEthereumProvider => {
  if (!isEthereumProviderEIP1193(arg)) return false;
  const { isConnected, isMetaMask } = arg as Partial<MetaMaskEthereumProvider>;
  if (typeof isConnected !== "function") return false;
  if (!isMetaMask) return false;
  return true;
};

type State = Partial<{
  accountAddress: string | null;
  chainId: string | null;
  isConnected: boolean;
  isMainnet: boolean;
  ethChainIdIsPending: boolean;
  ethAccountsIsPending: boolean;
  ethRequestAccountsIsPending: boolean;
}> & {
  detectProviderIsDone: boolean;
};

const initialState: State = { detectProviderIsDone: false };

type Action =
  | {
      type: "ETH_CHAIN_ID_REQUEST";
    }
  | {
      type: "ETH_CHAIN_ID_SUCCESS";
      data: Required<Pick<State, "chainId">>;
    }
  | { type: "ETH_CHAIN_ID_FAILURE" }
  | {
      type: "ETH_ACCOUNTS_REQUEST";
    }
  | {
      type: "ETH_ACCOUNTS_SUCCESS";
      data: Required<Pick<State, "accountAddress">>;
    }
  | { type: "ETH_ACCOUNTS_FAILURE" }
  | {
      type: "ETH_REQUEST_ACCOUNTS_REQUEST";
    }
  | {
      type: "ETH_REQUEST_ACCOUNTS_SUCCESS";
      data: Required<Pick<State, "accountAddress">>;
    }
  | { type: "ETH_REQUEST_ACCOUNTS_FAILURE" }
  | {
      type: "SET_DETECT_PROVIDER_IS_DONE";
    }
  | {
      type: "SET_IS_CONNECTED";
      data: Required<Pick<State, "isConnected">>;
    };

type ContextValue = Pick<
  State,
  | "detectProviderIsDone"
  | "ethChainIdIsPending"
  | "ethAccountsIsPending"
  | "ethRequestAccountsIsPending"
  | "isConnected"
  | "isMainnet"
> & {
  ethAccounts: () => void;
  ethRequestAccounts: () => void;
  ethRequestChainId: () => void;
  hasAccount?: boolean | undefined;
  hasProvider?: boolean | undefined;
};

const getAccountAddress = (accounts: unknown) => {
  if (Array.isArray(accounts)) {
    const accountAddress = accounts[0];
    if (typeof accountAddress === "string") return accountAddress;
  }
};

export const EthereumContext = createContext<ContextValue>({
  detectProviderIsDone: false,
  ethAccounts: () => {},
  ethRequestAccounts: () => {},
  ethRequestChainId: () => {},
});

EthereumContext.displayName = "EthereumContext";

export const EthereumContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const providerRef = useRef<MetaMaskEthereumProvider | null>(null);

  const [
    {
      accountAddress,
      isConnected,
      isMainnet,
      detectProviderIsDone,
      ethChainIdIsPending,
      ethAccountsIsPending,
      ethRequestAccountsIsPending,
    },
    dispatch,
  ] = useReducer<Reducer<State, Action>>((state, action) => {
    switch (action.type) {
      case "ETH_CHAIN_ID_REQUEST": {
        console.info(action.type);
        return {
          ...state,
          ethChainIdIsPending: true,
        };
      }
      case "ETH_CHAIN_ID_SUCCESS": {
        const { chainId } = action.data;
        const isMainnet = chainId === "0x1";
        console.info(action.type, `isMainnet=${isMainnet}`);
        return {
          ...state,
          chainId: chainId,
          ethChainIdIsPending: false,
          isMainnet,
        };
      }
      case "ETH_CHAIN_ID_FAILURE": {
        console.info(action.type);
        return {
          ...state,
          ethChainIdIsPending: false,
        };
      }

      case "ETH_ACCOUNTS_REQUEST": {
        console.info(action.type);
        return {
          ...state,
          ethAccountsIsPending: true,
        };
      }
      case "ETH_ACCOUNTS_SUCCESS": {
        const { accountAddress } = action.data;
        console.info(action.type, `accountAddress=${accountAddress}`);
        return {
          ...state,
          accountAddress,
          ethAccountsIsPending: false,
        };
      }
      case "ETH_ACCOUNTS_FAILURE": {
        console.info(action.type);
        return {
          ...state,
          ethAccountsIsPending: false,
        };
      }

      case "ETH_REQUEST_ACCOUNTS_REQUEST": {
        console.info(action.type);
        return {
          ...state,
          ethRequestAccountsIsPending: true,
        };
      }
      case "ETH_REQUEST_ACCOUNTS_SUCCESS": {
        const { accountAddress } = action.data;
        console.info(action.type, `accountAddress=${accountAddress}`);
        return {
          ...state,
          accountAddress,
          ethRequestAccountsIsPending: false,
        };
      }
      case "ETH_REQUEST_ACCOUNTS_FAILURE": {
        console.info(action.type);
        return {
          ...state,
          ethRequestAccountsIsPending: false,
        };
      }

      case "SET_DETECT_PROVIDER_IS_DONE": {
        console.info(action.type);
        return {
          ...state,
          detectProviderIsDone: true,
        };
      }

      case "SET_IS_CONNECTED": {
        const { isConnected } = action.data;
        console.info(action.type, `isConnected=${isConnected}`);
        return {
          ...state,
          isConnected,
        };
      }

      default:
        return state;
    }
  }, initialState);

  const setIsConnected = useCallback(() => {
    if (isConnected) return;
    console.info("Ethereum provider connected");
    dispatch({
      data: { isConnected: true },
      type: "SET_IS_CONNECTED",
    });
  }, [isConnected]);

  const detectProvider = useCallback(async () => {
    try {
      if (providerRef.current) return;
      const provider = await detectEthereumProvider();
      dispatch({
        type: "SET_DETECT_PROVIDER_IS_DONE",
      });
      if (isMetaMaskEthereumProvider(provider)) {
        console.info("Detected MetaMask Ethereum provider");
        providerRef.current = provider;
        if (provider.isConnected()) {
          setIsConnected();
        }
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: "SET_DETECT_PROVIDER_IS_DONE",
      });
    }
  }, [providerRef, setIsConnected]);

  const hasAccount: ContextValue["hasAccount"] =
    typeof accountAddress === "string";

  const hasProvider: ContextValue["hasProvider"] = providerRef.current !== null;

  const ethRequestChainId = useCallback(async () => {
    try {
      const provider = providerRef.current;
      if (!provider) return;
      if (ethChainIdIsPending) return;
      dispatch({ type: "ETH_CHAIN_ID_REQUEST" });
      const chainId = await provider.request({
        method: "eth_chainId",
      });
      if (typeof chainId === "string") {
        dispatch({
          data: { chainId },
          type: "ETH_CHAIN_ID_SUCCESS",
        });
      } else {
        dispatch({ type: "ETH_CHAIN_ID_FAILURE" });
      }
    } catch (error) {
      console.error(error);
      dispatch({ type: "ETH_CHAIN_ID_FAILURE" });
    }
  }, [ethChainIdIsPending, providerRef]);

  const ethAccounts = useCallback(async () => {
    try {
      const provider = providerRef.current;
      if (!provider) return;
      if (ethAccountsIsPending) return;
      dispatch({ type: "ETH_ACCOUNTS_REQUEST" });
      const accounts = await provider.request({
        method: "eth_accounts",
      });
      const accountAddress = getAccountAddress(accounts);
      if (accountAddress) {
        dispatch({
          data: { accountAddress },
          type: "ETH_ACCOUNTS_SUCCESS",
        });
      } else {
        dispatch({ type: "ETH_ACCOUNTS_FAILURE" });
      }
    } catch (error) {
      console.error(error);
      dispatch({ type: "ETH_ACCOUNTS_FAILURE" });
    }
  }, [ethAccountsIsPending, providerRef]);

  const ethRequestAccounts = useCallback(async () => {
    try {
      const provider = providerRef.current;
      if (!provider) return;
      if (ethRequestAccountsIsPending) return;
      dispatch({ type: "ETH_REQUEST_ACCOUNTS_REQUEST" });
      const accounts = await provider.request({
        method: "eth_requestAccounts",
      });
      const accountAddress = getAccountAddress(accounts);
      if (accountAddress) {
        dispatch({
          data: { accountAddress },
          type: "ETH_REQUEST_ACCOUNTS_SUCCESS",
        });
      } else {
        dispatch({ type: "ETH_REQUEST_ACCOUNTS_FAILURE" });
      }
    } catch (error) {
      console.error(error);
      dispatch({ type: "ETH_REQUEST_ACCOUNTS_FAILURE" });
    }
  }, [ethRequestAccountsIsPending, providerRef]);

  useEffect(() => {
    detectProvider();
  }, [detectProvider]);

  return (
    <EthereumContext.Provider
      value={{
        detectProviderIsDone,
        ethAccounts,
        ethRequestAccounts,
        ethRequestAccountsIsPending,
        ethRequestChainId,
        hasAccount,
        hasProvider,
        isConnected,
        isMainnet,
      }}
    >
      {children}
    </EthereumContext.Provider>
  );
};
