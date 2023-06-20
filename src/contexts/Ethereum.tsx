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

type State = {
  accountAddress: string | null;
  chainId: string | null;
  provider: MetaMaskInpageProvider | null;
  ethAccountsIsPending: boolean;
  ethRequestAccountsIsPending: boolean;
};

const initialState: State = {
  accountAddress: null,
  chainId: null,
  provider: null,
  ethAccountsIsPending: false,
  ethRequestAccountsIsPending: false,
};

type Action =
  | {
      type: "ETH_ACCOUNTS_REQUEST";
    }
  | { type: "ETH_ACCOUNTS_SUCCESS"; data: Pick<State, "accountAddress"> }
  | { type: "ETH_ACCOUNTS_FAILURE" }
  | {
      type: "ETH_REQUEST_ACCOUNTS_REQUEST";
    }
  | {
      type: "ETH_REQUEST_ACCOUNTS_SUCCESS";
      data: Pick<State, "accountAddress">;
    }
  | { type: "ETH_REQUEST_ACCOUNTS_FAILURE" }
  | {
      type: "SET_CHAIN_ID";
      data: Required<Pick<State, "chainId">>;
    }
  | {
      type: "SET_PROVIDER";
      data: Required<Pick<State, "provider">>;
    };

type ContextValue = Pick<
  State,
  "ethAccountsIsPending" | "ethRequestAccountsIsPending"
> & {
  hasAccount: boolean | undefined;
  hasProvider: boolean | undefined;
  ethRequestAccounts: () => void;
};

const getAccountAddress = (accounts: unknown) => {
  if (Array.isArray(accounts)) {
    const accountAddress = accounts[0];
    if (typeof accountAddress === "string") return accountAddress;
  }
};

export const EthereumContext = createContext<ContextValue>({
  ethAccountsIsPending: false,
  ethRequestAccounts: () => {},
  ethRequestAccountsIsPending: false,
  hasAccount: undefined,
  hasProvider: undefined,
});

EthereumContext.displayName = "EthereumContext";

export const EthereumContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [
    {
      accountAddress,
      chainId,
      provider,
      ethAccountsIsPending,
      ethRequestAccountsIsPending,
    },
    dispatch,
  ] = useReducer<Reducer<State, Action>>((state, action) => {
    switch (action.type) {
      case "ETH_ACCOUNTS_REQUEST": {
        return {
          ...state,
          ethAccountsIsPending: true,
        };
      }

      case "ETH_ACCOUNTS_SUCCESS": {
        const { accountAddress } = action.data;
        return {
          ...state,
          accountAddress,
          ethAccountsIsPending: false,
        };
      }

      case "ETH_ACCOUNTS_FAILURE": {
        return {
          ...state,
          ethAccountsIsPending: false,
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

      case "SET_CHAIN_ID": {
        const { chainId } = action.data;
        return {
          ...state,
          chainId: chainId,
          isMainnet: chainId === "0x1",
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
    if (provider) return;
    const detectedProvider =
      await detectEthereumProvider<MetaMaskInpageProvider>();
    dispatch({
      type: "SET_PROVIDER",
      data: {
        provider: detectedProvider,
      },
    });
  }, [provider]);

  const hasAccount: ContextValue["hasProvider"] = accountAddress !== null;

  let hasProvider: ContextValue["hasProvider"] = undefined;
  if (provider !== undefined) {
    hasProvider = provider === null ? false : true;
  }

  const requestChainId = useCallback(async () => {
    if (!provider) return;
    const chainId = await provider.request<string>({
      method: "eth_chainId",
    });
    if (!chainId) return;
    dispatch({ type: "SET_CHAIN_ID", data: { chainId } });
  }, [provider]);

  const ethAccounts = useCallback(async () => {
    try {
      if (!provider) return;
      if (ethAccountsIsPending) return;
      dispatch({ type: "ETH_ACCOUNTS_REQUEST" });
      const accounts = await provider.request<string[]>({
        method: "eth_accounts",
      });
      const accountAddress = getAccountAddress(accounts);
      if (accountAddress) {
        dispatch({ type: "ETH_ACCOUNTS_SUCCESS", data: { accountAddress } });
      } else {
        dispatch({ type: "ETH_ACCOUNTS_FAILURE" });
      }
    } catch (error) {
      console.error(error);
      dispatch({ type: "ETH_ACCOUNTS_FAILURE" });
    }
  }, [provider, ethAccountsIsPending]);

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
    if (provider === undefined) {
      detectProvider();
    } else if (provider !== null) {
      provider.on("chainChanged", () => {
        window.location.reload();
      });
    }
  }, [provider]);

  useEffect(() => {
    if (!provider) return;
    if (chainId) return;
    ethAccounts();
  }, [provider, ethAccounts]);

  useEffect(() => {
    if (!provider) return;
    if (chainId) return;
    requestChainId();
  }, [chainId, provider, requestChainId]);

  return (
    <EthereumContext.Provider
      value={{
        hasAccount,
        hasProvider,
        ethAccountsIsPending,
        ethRequestAccounts,
        ethRequestAccountsIsPending,
      }}
    >
      {children}
    </EthereumContext.Provider>
  );
};
