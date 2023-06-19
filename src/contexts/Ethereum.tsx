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

type DetectedProvider = MetaMaskInpageProvider | null;

type State = Partial<{
  account: string;
  chainId: string;
  provider: DetectedProvider;
  readAccountsIsPending: boolean;
}>;

type Action =
  | {
      type: "READ_ACCOUNTS_REQUEST";
    }
  | { type: "READ_ACCOUNTS_SUCCESS"; data: Pick<State, "account"> }
  | { type: "READ_ACCOUNTS_FAILURE" }
  | {
      type: "SET_CHAIN_ID";
      data: Required<Pick<State, "chainId">>;
    }
  | {
      type: "SET_PROVIDER";
      data: Required<Pick<State, "provider">>;
    };

type ContextValue = Pick<State, "readAccountsIsPending"> & {
  hasAccount: boolean | undefined;
  hasProvider: boolean | undefined;
  readAccounts: () => void;
};

export const EthereumContext = createContext<ContextValue>({
  hasAccount: undefined,
  hasProvider: undefined,
  readAccounts: () => {},
});

EthereumContext.displayName = "EthereumContext";

export const EthereumContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [{ account, chainId, provider, readAccountsIsPending }, dispatch] =
    useReducer<Reducer<State, Action>>((state, action) => {
      switch (action.type) {
        case "READ_ACCOUNTS_REQUEST": {
          return {
            ...state,
            readAccountsIsPending: true,
          };
        }

        case "READ_ACCOUNTS_SUCCESS": {
          const { account } = action.data;
          return {
            ...state,
            account,
            readAccountsIsPending: false,
          };
        }

        case "READ_ACCOUNTS_FAILURE": {
          return {
            ...state,
            readAccountsIsPending: false,
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
    }, {});

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

  let hasAccount: ContextValue["hasProvider"] = account !== undefined;

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

  const readAccounts = useCallback(async () => {
    try {
      if (!provider) return;
      if (readAccountsIsPending) return;
      dispatch({ type: "READ_ACCOUNTS_REQUEST" });
      const accounts = await provider.request<string[]>({
        method: "eth_requestAccounts",
      });
      if (Array.isArray(accounts)) {
        const account = accounts[0];
        if (typeof account === "string") {
          dispatch({ type: "READ_ACCOUNTS_SUCCESS", data: { account } });
          return;
        }
      }
      dispatch({ type: "READ_ACCOUNTS_FAILURE" });
    } catch (error) {
      console.error(error);
      dispatch({ type: "READ_ACCOUNTS_FAILURE" });
    }
  }, [provider, readAccountsIsPending]);

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
    requestChainId();
  }, [chainId, provider, requestChainId]);

  return (
    <EthereumContext.Provider value={{ hasAccount, hasProvider, readAccounts }}>
      {children}
    </EthereumContext.Provider>
  );
};
