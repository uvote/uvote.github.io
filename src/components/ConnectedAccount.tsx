import { FC, useCallback } from "react";
import { FormattedMessage } from "react-intl";
import { Button } from "trunx";
import { useAccount, useDisconnect } from "wagmi";

export const ConnectedAccount: FC = () => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  const onClickDisconnect = useCallback(() => {
    disconnect();
  }, [disconnect]);

  return (
    <div>
      <div>{address}</div>

      <Button onClick={onClickDisconnect}>
        <FormattedMessage id="ConnectedAccount.disconnect" />
      </Button>
    </div>
  );
};
