import { Button } from "_/components/library";
import { useMyNickname } from "_/hooks/useMyNickname";
import { useWriteNicknameRegistrySetNickname } from "_/wagmi/generated";
import { wagmiProviderConfig } from "_/wagmi/provider";
import { getChainId } from "@wagmi/core";
import { FC, useCallback } from "react";
import { FormattedMessage } from "react-intl";
import { useAccount, useBalance, useDisconnect } from "wagmi";

export const ConnectedAccount: FC = () => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const nickname = useMyNickname();

  const chainId = getChainId(wagmiProviderConfig);

  const { data: balance } = useBalance({ address });

  const setNickname = useWriteNicknameRegistrySetNickname();

  const onClickDisconnect = useCallback(() => {
    disconnect();
  }, [disconnect]);

  const onClickSetNickname = useCallback(() => {
    setNickname.writeContract({ args: ["test"] });
  }, [setNickname]);

  return (
    <>
      <div>{address}</div>
      <div>{nickname}</div>
      <div>Chain ID: {chainId}</div>

      {balance ? (
        <div>
          {balance.value.toString()} {balance.symbol}
        </div>
      ) : null}

      <Button onClick={onClickDisconnect}>
        <FormattedMessage id="ConnectedAccount.disconnect" />
      </Button>

      <Button onClick={onClickSetNickname}>set nickname</Button>
      <div>{setNickname.data}</div>
    </>
  );
};
