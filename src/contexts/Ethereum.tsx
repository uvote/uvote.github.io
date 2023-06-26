import detectEthereumProvider from "@metamask/detect-provider";
import { MetaMaskInpageProvider } from "@metamask/providers";
import { MetaMaskSDK } from "@metamask/sdk";
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

import { useIsMobile } from "../hooks/useIsMobile";
import { metadata } from "../metadata";

const ethereumMainnetChainId = "0x1";
const ethereumGoerliChainId = "0x5";
const ethereumTestnetChainIds = [ethereumGoerliChainId];

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
  isTestnet: boolean;
  isMainnet: boolean;
  ethChainIdIsPending: boolean;
  ethAccountsIsPending: boolean;
  ethRequestAccountsIsPending: boolean;
  detectProviderIsDone: boolean;
}> & {
  isConnected: boolean;
};

const initialState: State = { isConnected: false };

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
      type: "SET_CHAIN_ID";
      data: Required<Pick<State, "chainId">>;
    }
  | {
      type: "SET_DETECT_PROVIDER_IS_DONE";
    }
  | {
      type: "SET_IS_CONNECTED";
      data: Required<Pick<State, "isConnected">>;
    };

type ContextValue = Pick<State, "detectProviderIsDone" | "isConnected"> & {
  isEthereumNetwork?: boolean | undefined;
  ethAccounts: () => void;
  ethRequestAccounts: () => void;
  hasAccount?: boolean | undefined;
  hasProvider?: boolean | undefined;
};

const getAccountAddress = (accounts: unknown) => {
  if (Array.isArray(accounts)) {
    const accountAddress = accounts[0];
    if (typeof accountAddress === "string") return accountAddress;
  }
};

const getEthereumNetworkByChainId = (
  chainId: unknown
): Required<Pick<State, "isMainnet" | "isTestnet">> => {
  if (typeof chainId !== "string") {
    return {
      isMainnet: false,
      isTestnet: false,
    };
  }
  return {
    isMainnet: chainId === ethereumMainnetChainId,
    isTestnet: ethereumTestnetChainIds.includes(chainId),
  };
};

export const EthereumContext = createContext<ContextValue>({
  detectProviderIsDone: false,
  ethAccounts: () => {},
  ethRequestAccounts: () => {},
  isConnected: false,
});

EthereumContext.displayName = "EthereumContext";

export const EthereumContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const providerRef = useRef<MetaMaskEthereumProvider | null>(null);
  const metaMaskSDKRef = useRef<MetaMaskSDK | null>(null);

  const { isMobile } = useIsMobile();

  const [
    {
      accountAddress,
      chainId,
      isConnected,
      isTestnet,
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
      case "SET_CHAIN_ID":
      case "ETH_CHAIN_ID_SUCCESS": {
        const { chainId } = action.data;
        const { isMainnet, isTestnet } = getEthereumNetworkByChainId(chainId);
        console.info(
          action.type,
          `chainId=${chainId}`,
          `isMainnet=${isMainnet}`
        );
        console.info(
          action.type,
          `chainId=${chainId}`,
          `isTestnet=${isTestnet}`
        );
        return {
          ...state,
          chainId: chainId,
          ethChainIdIsPending:
            action.type === "ETH_CHAIN_ID_SUCCESS" ? false : undefined,
          isMainnet,
          isTestnet,
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

  const isEthereumNetwork = isMainnet || isTestnet;

  const onChainChanged = useCallback(
    (chainId: unknown) => {
      if (typeof chainId === "string") {
        dispatch({ data: { chainId }, type: "SET_CHAIN_ID" });
      } else {
        console.warn("Unexpected chainId", chainId);
      }
    },
    [dispatch]
  );

  const detectProvider = useCallback(async () => {
    try {
      const metaMaskSDK = metaMaskSDKRef.current;
      if (providerRef.current) return;
      const initialize = (provider: unknown) => {
        if (isMetaMaskEthereumProvider(provider)) {
          provider.on("chainChanged", onChainChanged);
          if (provider.isConnected()) {
            console.info("Ethereum provider connected");
            dispatch({
              data: { isConnected: true },
              type: "SET_IS_CONNECTED",
            });
          }
          providerRef.current = provider;
        }
        dispatch({
          type: "SET_DETECT_PROVIDER_IS_DONE",
        });
      };

      if (metaMaskSDK) {
        const provider = metaMaskSDK.getProvider();
        initialize(provider);
      } else {
        const provider = await detectEthereumProvider();
        initialize(provider);
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: "SET_DETECT_PROVIDER_IS_DONE",
      });
    }
  }, [metaMaskSDKRef, onChainChanged, providerRef]);

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

  const initializeMetaMaskSDK = useCallback(() => {
    if (!metaMaskSDKRef.current) return;
    console.info("initializeMetaMaskSDK");
    metaMaskSDKRef.current = new MetaMaskSDK({
      dappMetadata: {
        name: metadata.asciiName,
        url: metadata.url,
      },
    });
  }, [metaMaskSDKRef]);

  useEffect(() => {
    if (isMobile) initializeMetaMaskSDK();
    detectProvider();
  }, [detectProvider, initializeMetaMaskSDK, isMobile]);

  useEffect(() => {
    if (!isConnected) return;
    if (chainId) return;
    if (ethChainIdIsPending) return;
    ethRequestChainId();
  }, [chainId, isConnected, ethRequestChainId, ethChainIdIsPending]);

  return (
    <EthereumContext.Provider
      value={{
        detectProviderIsDone,
        ethAccounts,
        ethRequestAccounts,
        hasAccount,
        hasProvider,
        isConnected,
        isEthereumNetwork,
      }}
    >
      {children}
    </EthereumContext.Provider>
  );
};
