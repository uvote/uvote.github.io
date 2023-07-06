import { FC, useCallback } from "react";
import { Button } from "trunx";
import { Connector, useConnect } from "wagmi";

export const AccountConnectors: FC = () => {
  const { connect, connectors, pendingConnector } = useConnect();

  const onClick = useCallback<(connector: Connector) => () => void>(
    (connector) => () => {
      connect({ connector });
    },
    [connect]
  );

  return (
    <>
      {connectors.map((connector) => (
        <Button
          key={connector.id}
          disabled={!connector.ready}
          isLoading={pendingConnector?.id === connector.id}
          onClick={onClick(connector)}
        >
          {connector.name}
        </Button>
      ))}
    </>
  );
};
