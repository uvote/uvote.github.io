import { FC, useCallback, useContext } from "react";
import { FormattedMessage } from "react-intl";
import { Button } from "trunx";

import { ConnectWalletContext } from "../contexts/ConnectWallet";
import { EthereumContext } from "../contexts/Ethereum";
import { metaMaskDeepLink } from "../locators";

export const ConnectMetaMask: FC = () => {
  const { setConnectWalletModalIsActive } = useContext(ConnectWalletContext);

  const { ethRequestAccounts, hasProvider } = useContext(EthereumContext);

  const onClick = useCallback(() => {
    if (hasProvider) {
      ethRequestAccounts();
      setConnectWalletModalIsActive(false);
    } else {
      window.location.href = metaMaskDeepLink;
    }
  }, [hasProvider, ethRequestAccounts, setConnectWalletModalIsActive]);

  return (
    <Button onClick={onClick}>
      {hasProvider ? (
        <FormattedMessage id="ConnectMetaMask.connect" />
      ) : (
        <FormattedMessage id="ConnectMetaMask.install" />
      )}
    </Button>
  );
};
