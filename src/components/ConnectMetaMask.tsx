import { FC, useCallback, useContext } from "react";
import { FormattedMessage } from "react-intl";
import { Button } from "trunx";

import { ConnectWalletContext } from "../contexts/ConnectWallet";
import { EthereumContext } from "../contexts/Ethereum";
import { metaMaskDownloadUrl } from "../locators";

export const ConnectMetaMask: FC = () => {
  const { setConnectWalletModalIsActive } = useContext(ConnectWalletContext);

  const { ethRequestAccounts, ethRequestAccountsIsPending, hasProvider } =
    useContext(EthereumContext);

  const disabled = ethRequestAccountsIsPending;

  const onClick = useCallback(() => {
    if (disabled) return;
    if (hasProvider) {
      ethRequestAccounts();
      setConnectWalletModalIsActive(false);
    } else {
      window.location.href = metaMaskDownloadUrl;
    }
  }, [
    disabled,
    hasProvider,
    ethRequestAccounts,
    setConnectWalletModalIsActive,
  ]);

  return (
    <Button disabled={disabled} onClick={onClick}>
      {hasProvider ? (
        <FormattedMessage id="ConnectMetaMask.connect" />
      ) : (
        <FormattedMessage id="ConnectMetaMask.install" />
      )}
    </Button>
  );
};
