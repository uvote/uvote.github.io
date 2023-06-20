import { FC, useCallback } from "react";
import { Button } from "trunx";
import { useIsMobile } from "../hooks/useIsMobile";
import { metaMaskDeepLink } from "../locators";

const label = "Open MetaMask";

export const OpenMetaMaskBrowser: FC = () => {
  const { isMobile } = useIsMobile();

  const onClick = useCallback(() => {
    window.location.href = metaMaskDeepLink;
  }, []);

  if (!isMobile) return null;

  return <Button onClick={onClick}>{label}</Button>;
};
