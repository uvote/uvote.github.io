import { FC, useCallback, useContext } from "react";
import { Button } from "trunx";
import { ConnectWalletContext } from "../contexts/ConnectWallet";
import { EthereumContext } from "../contexts/Ethereum";

const label = "Connect MetaMask";

export const ConnectMetaMask: FC = () => {
  const { setConnectWalletModalIsActive } = useContext(ConnectWalletContext);

  const { hasProvider, ethRequestAccounts, ethRequestAccountsIsPending } =
    useContext(EthereumContext);

  let disabled = ethRequestAccountsIsPending;

  const onClick = useCallback(() => {
    if (disabled) return;
    if (hasProvider) {
      ethRequestAccounts();
      setConnectWalletModalIsActive(false);
    }
  }, [
    disabled,
    hasProvider,
    ethRequestAccounts,
    setConnectWalletModalIsActive,
  ]);

  if (hasProvider === undefined) return null;

  return (
    <Button disabled={disabled} onClick={onClick}>
      {label}
    </Button>
  );
};
