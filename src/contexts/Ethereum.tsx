import {
  createContext,
  FC,
  PropsWithChildren,
  Reducer,
  useCallback,
  useEffect,
  useReducer,
} from "react";

/**
 * Ethereum Provider JavaScript API
 *
 * See {@link https://eips.ethereum.org/EIPS/eip-1193}
 */
type EthereumProvider = {
  request: ({
    method,
  }: {
    readonly method: string;
    readonly params?: readonly unknown[] | object;
  }) => Promise<unknown>;
  on(
    eventName: string,
    listener: (...args: unknown[]) => void
  ): EthereumProvider;
};

const isEthereumProvider = (arg: unknown): arg is EthereumProvider => {
  if (!arg || typeof arg !== "object") return false;
  const { on, request } = arg as Partial<EthereumProvider>;
  if (typeof on !== "function") return false;
  if (typeof request !== "function") return false;
  return true;
};

type State = Partial<{
  accountAddress: string | null;
  chainId: string | null;
  isConnected: boolean;
  isMainnet: boolean;
  provider: EthereumProvider | null;
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
      type: "SET_IS_CONNECTED";
      data: Required<Pick<State, "isConnected">>;
    }
  | {
      type: "SET_PROVIDER";
      data: Required<Pick<State, "provider">>;
    };

type ContextValue = Pick<
  State,
  | "ethChainIdIsPending"
  | "ethRequestAccountsIsPending"
  | "isConnected"
  | "isMainnet"
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
      isConnected,
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

      case "SET_IS_CONNECTED": {
        return {
          ...state,
          ...action.data,
        };
      }

      case "SET_PROVIDER": {
        return {
          ...state,
          ...action.data,
        };
      }

      default:
        return state;
    }
  }, initialState);

  const detectProvider = useCallback(() => {
    if (provider) return;
    const { ethereum } = window;
    if (isEthereumProvider(ethereum)) {
      dispatch({
        type: "SET_PROVIDER",
        data: {
          provider: ethereum,
        },
      });
    } else {
      dispatch({
        type: "SET_PROVIDER",
        data: {
          provider: null,
        },
      });
    }
  }, [provider]);

  const hasAccount: ContextValue["hasAccount"] = accountAddress !== null;

  const hasProvider: ContextValue["hasProvider"] = provider !== null;

  const ethRequestChainId = useCallback(async () => {
    try {
      if (!provider) return;
      if (ethChainIdIsPending) return;
      dispatch({ type: "ETH_CHAIN_ID_REQUEST" });
      const chainId = await provider.request({
        method: "eth_chainId",
      });
      if (typeof chainId === "string") {
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
      const accounts = await provider.request({
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
    console.log("provider", provider);
    if (provider === undefined) {
      detectProvider();
      return;
    }

    let detectProviderIntervalId = 0;
    if (provider) {
      window.clearInterval(detectProviderIntervalId);
      provider.on("connect", () => {
        console.log("connect!!!");
      });
    }

    if (provider === null) {
      if (detectProviderIntervalId !== 0) return;
      detectProviderIntervalId = window.setInterval(detectProvider, 3000);
    }

    return () => {
      window.clearInterval(detectProviderIntervalId);
    };
  }, [detectProvider, isConnected, provider]);

  return (
    <EthereumContext.Provider
      value={{
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
