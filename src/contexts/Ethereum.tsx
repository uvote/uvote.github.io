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
} from "react";

import { metadata } from "../metadata";

const MMSDK = new MetaMaskSDK({
  injectProvider: true,
  dappMetadata: {
    url: metadata.url,
    name: metadata.asciiName,
  },
});

type State = Partial<{
  accountAddress: string | null;
  chainId: string | null;
  isMainnet: boolean;
  provider: MetaMaskInpageProvider | null;
  ethChainIdIsPending: boolean;
  ethRequestAccountsIsPending: boolean;
}>;

const initialState: State = {};

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
      type: "ETH_REQUEST_ACCOUNTS_REQUEST";
    }
  | {
      type: "ETH_REQUEST_ACCOUNTS_SUCCESS";
      data: Pick<State, "accountAddress">;
    }
  | { type: "ETH_REQUEST_ACCOUNTS_FAILURE" }
  | {
      type: "SET_PROVIDER";
      data: Required<Pick<State, "provider">>;
    };

type ContextValue = Pick<
  State,
  "ethChainIdIsPending" | "ethRequestAccountsIsPending" | "isMainnet"
> & {
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
  ethRequestChainId: () => {},
  ethRequestAccounts: () => {},
});

EthereumContext.displayName = "EthereumContext";

export const EthereumContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [
    {
      accountAddress,
      isMainnet,
      provider,
      ethChainIdIsPending,
      ethRequestAccountsIsPending,
    },
    dispatch,
  ] = useReducer<Reducer<State, Action>>((state, action) => {
    switch (action.type) {
      case "ETH_CHAIN_ID_REQUEST": {
        return {
          ...state,
          ethChainIdIsPending: true,
        };
      }
      case "ETH_CHAIN_ID_SUCCESS": {
        const { chainId } = action.data;
        return {
          ...state,
          ethChainIdIsPending: false,
          chainId: chainId,
          isMainnet: chainId === "0x1",
        };
      }
      case "ETH_CHAIN_ID_FAILURE": {
        return {
          ...state,
          ethChainIdIsPending: false,
        };
      }

      case "ETH_REQUEST_ACCOUNTS_REQUEST": {
        return {
          ...state,
          ethRequestAccountsIsPending: true,
        };
      }
      case "ETH_REQUEST_ACCOUNTS_SUCCESS": {
        const { accountAddress } = action.data;
        return {
          ...state,
          accountAddress,
          ethRequestAccountsIsPending: false,
        };
      }
      case "ETH_REQUEST_ACCOUNTS_FAILURE": {
        return {
          ...state,
          ethRequestAccountsIsPending: false,
        };
      }

      case "SET_PROVIDER": {
        const { provider } = action.data;
        return {
          ...state,
          provider,
        };
      }

      default:
        return state;
    }
  }, initialState);

  const detectProvider = useCallback(async () => {
    if (provider !== undefined) return;
    const detectedProvider = MMSDK.getProvider();
    dispatch({
      type: "SET_PROVIDER",
      data: {
        provider: detectedProvider ?? null,
      },
    });
  }, [provider]);

  const hasAccount: ContextValue["hasProvider"] = accountAddress !== null;

  const hasProvider: ContextValue["hasProvider"] = provider !== null;

  const ethRequestChainId = useCallback(async () => {
    try {
      if (!provider) return;
      if (ethChainIdIsPending) return;
      dispatch({ type: "ETH_CHAIN_ID_REQUEST" });
      const chainId = await provider.request<string>({
        method: "eth_chainId",
      });
      if (chainId) {
        dispatch({ type: "ETH_CHAIN_ID_SUCCESS", data: { chainId } });
      } else {
        dispatch({ type: "ETH_CHAIN_ID_FAILURE" });
      }
    } catch (error) {
      console.error(error);
      dispatch({ type: "ETH_CHAIN_ID_FAILURE" });
    }
  }, [provider, ethChainIdIsPending]);

  const ethRequestAccounts = useCallback(async () => {
    try {
      if (!provider) return;
      if (ethRequestAccountsIsPending) return;
      dispatch({ type: "ETH_REQUEST_ACCOUNTS_REQUEST" });
      const accounts = await provider.request<string[]>({
        method: "eth_requestAccounts",
      });
      const accountAddress = getAccountAddress(accounts);
      if (accountAddress) {
        dispatch({
          type: "ETH_REQUEST_ACCOUNTS_SUCCESS",
          data: { accountAddress },
        });
      } else {
        dispatch({ type: "ETH_REQUEST_ACCOUNTS_FAILURE" });
      }
    } catch (error) {
      console.error(error);
      dispatch({ type: "ETH_REQUEST_ACCOUNTS_FAILURE" });
    }
  }, [provider, ethRequestAccountsIsPending]);

  useEffect(() => {
    if (provider !== undefined) return;
    detectProvider();
  }, [provider, detectProvider]);

  useEffect(() => {
    if (!provider) return;
    provider.on("chainChanged", () => {
      window.location.reload();
    });
  }, [provider]);

  return (
    <EthereumContext.Provider
      value={{
        ethRequestAccounts,
        ethRequestAccountsIsPending,
        ethRequestChainId,
        hasAccount,
        hasProvider,
        isMainnet,
      }}
    >
      {children}
    </EthereumContext.Provider>
  );
};
