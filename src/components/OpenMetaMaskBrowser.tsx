import { FC, useCallback, useContext } from "react";
import { Button } from "trunx";
import { ConnectWalletContext } from "../contexts/ConnectWallet";
import { useIsMobile } from "../hooks/useIsMobile";
import { metaMaskDeepLink } from "../locators";

const label = "Open MetaMask browser";

export const OpenMetaMaskBrowser: FC = () => {
  const { setConnectWalletModalIsActive } = useContext(ConnectWalletContext);

  const { isMobile } = useIsMobile();

  const onClick = useCallback(() => {
    setConnectWalletModalIsActive(false);
    window.location.href = metaMaskDeepLink;
  }, [setConnectWalletModalIsActive]);

  if (!isMobile) return null;

  return <Button onClick={onClick}>{label}</Button>;
};
