import { FC, useCallback, useContext } from "react";
import { Button } from "trunx";
import { EthereumContext } from "../contexts/Ethereum";

const label = "Connect MetaMask";

export const ConnectMetaMask: FC = () => {
  const { hasProvider, ethRequestAccounts, ethRequestAccountsIsPending } =
    useContext(EthereumContext);

  let disabled = ethRequestAccountsIsPending;

  const onClick = useCallback(() => {
    if (disabled) return;
    if (hasProvider) ethRequestAccounts();
  }, [disabled, hasProvider, ethRequestAccounts]);

  if (hasProvider === undefined) return null;

  return (
    <Button disabled={disabled} onClick={onClick}>
      {label}
    </Button>
  );
};
