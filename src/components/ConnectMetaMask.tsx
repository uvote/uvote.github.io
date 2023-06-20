import { FC, useCallback, useContext } from "react";
import { Button } from "trunx";
import { EthereumContext } from "../contexts/Ethereum";
import { useIsMobile } from "../hooks/useIsMobile";
import { metaMaskDeepLink } from "../locators";

const labelConnect = "Connect MetaMask";
const labelOpen = "Open MetaMask";

export const ConnectMetaMask: FC = () => {
  const { isMobile } = useIsMobile();

  const {
    hasProvider,
    ethRequestAccounts,
    ethAccountsIsPending,
    ethRequestAccountsIsPending,
  } = useContext(EthereumContext);

  const label = isMobile ? labelOpen : labelConnect;

  let disabled = ethRequestAccountsIsPending;

  const onClick = useCallback(() => {
    if (isMobile) {
      window.location.href = metaMaskDeepLink;
    } else {
      if (disabled) return;
      if (hasProvider) {
        ethRequestAccounts();
      }
    }
  }, [disabled, hasProvider, ethRequestAccounts]);

  if (hasProvider === undefined) return null;
  if (ethAccountsIsPending) return null;

  return (
    <Button disabled={disabled} onClick={onClick}>
      {label}
    </Button>
  );
};
