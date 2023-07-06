import { FC, useCallback } from "react";
import { FormattedMessage } from "react-intl";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "trunx";
import { useAccount } from "wagmi";

import { pathname } from "../routing/pathnames";

export const AccountPreview: FC = () => {
  const { address, isConnected } = useAccount();
  const navigate = useNavigate();

  const shortAddress = address
    ? address.substring(0, 6) +
      "..." +
      address.substring(address.length - 4, address.length)
    : "";

  const onClick = useCallback(() => {
    navigate(pathname.account());
  }, [navigate]);

  return isConnected ? (
    <Link to={pathname.account()}>{`[${shortAddress}]`}</Link>
  ) : (
    <Button onClick={onClick}>
      <FormattedMessage id="AccountPreview.connect" />
    </Button>
  );
};
