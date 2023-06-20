import { FC, useCallback, useContext } from "react";
import { Button } from "trunx";
import { EthereumContext } from "../contexts/Ethereum";

const label = "Connect MetaMask";

export const ConnectMetaMask: FC = () => {
  const {
    hasAccount,
    hasProvider,
    ethRequestAccounts,
    ethAccountsIsPending,
    ethRequestAccountsIsPending,
  } = useContext(EthereumContext);

  let disabled = ethRequestAccountsIsPending;

  const onClick = useCallback(() => {
    if (disabled) return;
    if (hasAccount) return;
    if (hasProvider) {
      ethRequestAccounts();
    }
  }, [disabled, hasAccount, hasProvider, ethRequestAccounts]);

  if (hasProvider === undefined) return null;
  if (hasAccount) return null;
  if (ethAccountsIsPending) return null;

  return (
    <Button disabled={disabled} onClick={onClick}>
      {label}
    </Button>
  );
};
