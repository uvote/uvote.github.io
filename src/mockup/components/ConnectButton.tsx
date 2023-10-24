import { Button, ButtonProps } from "_/components/library";
import { vitalikAddress as address } from "_/mockup/fixtures/addresses";
import { pathname } from "_/mockup/routing/pathnames";
import { classNames } from "_/styles/classNames";
import { FC, useCallback, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";

export const ConnectButton: FC = () => {
  const navigate = useNavigate();

  const [isConnected, setIsConnected] = useState(false);

  const color: ButtonProps["color"] = isConnected ? "success" : "warning";

  const onClick = useCallback(() => {
    if (isConnected) {
      navigate(pathname.connectedAccount());
    } else {
      setIsConnected(true);
    }
  }, [isConnected, navigate]);

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
