import { FC } from "react";
import { Button } from "trunx";
import { useEthereum } from "../hooks/useEthereum";

const connectLabel = "Connect Wallet";
const disconnectLabel = "Disconnect Wallet";

export const ConnectMetaMask: FC = () => {
  const { ethereumIsConnected } = useEthereum();

  if (ethereumIsConnected === undefined) return null;

  let label = ethereumIsConnected ? disconnectLabel : connectLabel;

  return <Button color="primary">{label}</Button>;
};
