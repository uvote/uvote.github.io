import { FC, useCallback } from "react";
import { Button } from "trunx";
import { metaMaskDeepLink } from "../locators";

const label = "Open MetaMask";

export const OpenMetaMaskBrowser: FC = () => {
  const onClick = useCallback(() => {
    window.location.href = metaMaskDeepLink;
  }, []);

  return <Button onClick={onClick}>{label}</Button>;
};
