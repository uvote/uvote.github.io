import { Button } from "_/components/library";
import { useMyNickname } from "_/hooks/useMyNickname";
import {
  nicknameRegistryAbi,
  nicknameRegistryAddress,
} from "_/wagmi/generated";
import { FC, useCallback } from "react";
import { FormattedMessage } from "react-intl";
import { useAccount, useBalance, useDisconnect, useReadContract } from "wagmi";

export const ConnectedAccount: FC = () => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const nickname = useMyNickname();

  const { data: balance } = useBalance({ address });

  const onClickDisconnect = useCallback(() => {
    disconnect();
  }, [disconnect]);

  return (
    <>
      <div>{address}</div>
      <div>{nickname}</div>

      {balance ? (
        <div>
          {balance.value.toString()} {balance.symbol}
        </div>
      ) : null}

      <Button onClick={onClickDisconnect}>
        <FormattedMessage id="ConnectedAccount.disconnect" />
      </Button>
    </>
  );
};
