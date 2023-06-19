import { FC, useCallback, useContext } from "react";
import { Button } from "trunx";
import { EthereumContext } from "../contexts/Ethereum";

const connectLabel = "Connect Wallet";

export const ConnectMetaMask: FC = () => {
  const { hasAccount, hasProvider, readAccounts, readAccountsIsPending } =
    useContext(EthereumContext);

  let disabled = readAccountsIsPending;

  const onClick = useCallback(() => {
    if (disabled) return;
    if (hasAccount) return;
    if (hasProvider) {
      readAccounts();
    }
  }, [disabled, hasAccount, hasProvider, readAccounts]);

  if (hasProvider === undefined) return null;
  if (hasAccount) return null;

  return (
    <Button disabled={disabled} onClick={onClick}>
      {connectLabel}
    </Button>
  );
};
