import { Button, Main } from "_/components/library";
import { FC, useCallback } from "react";
import { FormattedMessage } from "react-intl";
import { useAccount, useDisconnect } from "wagmi";

export const ConnectedAccount: FC = () => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  const onClickDisconnect = useCallback(() => {
    disconnect();
  }, [disconnect]);

  return (
    <>
      <div>{address}</div>

      <Button onClick={onClickDisconnect}>
        <FormattedMessage id="ConnectedAccount.disconnect" />
      </Button>
    </>
  );
};
