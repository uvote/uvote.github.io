import { FC, useContext } from "react";
import { Button } from "trunx";
import { EthereumContext } from "../contexts/Ethereum";

const connectLabel = "Connect Wallet";
const disconnectLabel = "Disconnect Wallet";

export const ConnectMetaMask: FC = () => {
  const { isConnected } = useContext(EthereumContext);

  if (isConnected === undefined) return null;

  let label = isConnected ? disconnectLabel : connectLabel;

  return <Button>{label}</Button>;
};
