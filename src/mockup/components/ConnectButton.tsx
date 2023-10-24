import { Button, ButtonProps } from "_/components/library";
import { classNames } from "_/styles/classNames";
import { FC, useCallback, useState } from "react";
import { FormattedMessage } from "react-intl";

// Vitalik address: https://etherscan.io/address/vitalik.eth
const address = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045";

export const ConnectButton: FC = () => {
  const [isConnected, setIsConnected] = useState(false);

  const color: ButtonProps["color"] = isConnected ? "success" : "warning";

  const onClick = useCallback(() => {
    setIsConnected((isConnected) => !isConnected);
  }, []);

  return (
    <Button color={color} onClick={onClick}>
      {isConnected ? (
        <span className={classNames("ConnectButton__address")}>{address}</span>
      ) : (
        <FormattedMessage id="ConnectButton.connect" />
      )}
    </Button>
  );
};
