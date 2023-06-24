import { FC, useCallback, useContext } from "react";
import { Button } from "trunx";

import { ConnectWalletContext } from "../contexts/ConnectWallet";
import { EthereumContext } from "../contexts/Ethereum";
import { useIsMobile } from "../hooks/useIsMobile";
import { metaMaskDeepLink } from "../locators";

const label = "Open MetaMask browser";

export const OpenMetaMaskBrowser: FC = () => {
  const { setConnectWalletModalIsActive } = useContext(ConnectWalletContext);
  const { ethRequestAccountsIsPending, hasProvider } =
    useContext(EthereumContext);

  const { isMobile } = useIsMobile();

  const disabled = hasProvider || ethRequestAccountsIsPending;

  const onClick = useCallback(() => {
    if (disabled) return;
    setConnectWalletModalIsActive(false);
    window.location.href = metaMaskDeepLink;
  }, [disabled, setConnectWalletModalIsActive]);

  if (!isMobile) return null;

  return (
    <Button disabled={disabled} onClick={onClick}>
      {label}
    </Button>
  );
};
