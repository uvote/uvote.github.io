import { FC, useCallback } from "react";
import { FormattedMessage } from "react-intl";
import { Button, Flex } from "trunx";
import { Connector, useConnect } from "wagmi";

import { useIsMobile } from "../hooks/useIsMobile";
import { metaMaskDeepLink } from "../locators";

export const AccountConnectors: FC = () => {
  const { connect, connectors, pendingConnector } = useConnect();
  const { isMobile } = useIsMobile();

  const metaMaskConnector = connectors.find(({ id }) => id === "metaMask");
  const coinbaseWalletConnector = connectors.find(
    ({ id }) => id === "coinbaseWallet"
  );

  let coinbaseWalletDisabled = true;
  let coinbaseWalletIsLoading = false;
  if (coinbaseWalletConnector) {
    coinbaseWalletDisabled = !coinbaseWalletConnector.ready;
    coinbaseWalletIsLoading =
      coinbaseWalletConnector.id === pendingConnector?.id;
  }

  let metaMaskDisabled = true;
  let metaMaskIsLoading = false;
  if (metaMaskConnector) {
    metaMaskDisabled = !metaMaskConnector.ready;
    metaMaskIsLoading = metaMaskConnector.id === pendingConnector?.id;
  }

  const onClickConnector = useCallback<(connector?: Connector) => () => void>(
    (connector) => () => {
      if (connector) {
        connect({ connector });
      }
    },
    [connect]
  );

  const onClickOpenMetaMaskBrowser = useCallback(() => {
    window.location.href = metaMaskDeepLink;
  }, []);

  return (
    <Flex direction="column">
      {isMobile ? null : (
        <div>
          <Button
            disabled={metaMaskDisabled}
            isLoading={metaMaskIsLoading}
            onClick={onClickConnector(metaMaskConnector)}
          >
            <FormattedMessage id="AccountConnectors.metaMaskWallet" />
          </Button>
        </div>
      )}

      <div>
        <Button
          disabled={coinbaseWalletDisabled}
          isLoading={coinbaseWalletIsLoading}
          onClick={onClickConnector(coinbaseWalletConnector)}
        >
          <FormattedMessage id="AccountConnectors.coinbaseWallet" />
        </Button>
      </div>

      {isMobile ? (
        <div>
          <Button onClick={onClickOpenMetaMaskBrowser}>
            <FormattedMessage id="AccountConnectors.metaMaskBrowser" />
          </Button>
        </div>
      ) : null}
    </Flex>
  );
};
