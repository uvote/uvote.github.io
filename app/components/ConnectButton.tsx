import { Button, ButtonProps } from "_/components/library";
import { pathname } from "_/routing/pathnames";
import { classNames } from "_/styles/classNames";
import { FC, useCallback } from "react";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";

export const ConnectButton: FC = () => {
  const account = useAccount();
  const { address, isConnected } = account;
  const navigate = useNavigate();

  const color: ButtonProps["color"] = isConnected ? "success" : "warning";

  const onClick = useCallback(() => {
    navigate(pathname.account());
  }, [navigate]);

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
