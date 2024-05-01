import { useIsDev } from "_/hooks/useIsDev";
import { useIsMobile } from "_/hooks/useIsMobile";
import { metaMaskDeepLink } from "_/locators";
import { debug } from "_/logging";
import { FC, useCallback } from "react";
import toast from "react-hot-toast";
import { FormattedMessage, useIntl } from "react-intl";
import { Button, Flex } from "trunx";
import { useConnect } from "wagmi";

type Props = {
  onConnect: () => void;
};

export const AccountConnectors: FC<Props> = ({ onConnect }) => {
  const { formatMessage } = useIntl();

  const isDev = useIsDev();

  const { connectors, status: connectStatus } = useConnect();
  const { isMobile } = useIsMobile();

  const isLoading = connectStatus === "pending";

  const metaMask = connectors.find(({ id }) => id === "io.metamask");
  const coinbase = connectors.find(({ id }) => id === "coinbaseWalletSDK");

  const showCannotConnectMessage = useCallback(() => {
    toast(formatMessage({ id: "AccountConnectors.cannotConnect" }));
  }, [formatMessage]);

  return (
    <Flex direction="column">
      {isMobile ? null : metaMask ? (
        <div>
          <Button
            isLoading={isLoading}
            onClick={async () => {
              try {
                await metaMask.connect();
                onConnect();
              } catch (error) {
                debug(error);
                showCannotConnectMessage();
              }
            }}
          >
            <FormattedMessage id="AccountConnectors.metaMaskWallet" />
          </Button>
        </div>
      ) : null}

      {coinbase ? (
        <div>
          <Button
            isLoading={isLoading}
            onClick={async () => {
              try {
                await coinbase.connect();
                onConnect();
              } catch (error) {
                debug(error);
                showCannotConnectMessage();
              }
            }}
          >
            <FormattedMessage id="AccountConnectors.coinbaseWallet" />
          </Button>
        </div>
      ) : null}

      {isMobile ? (
        <div>
          <Button
            onClick={() => {
              window.location.href = metaMaskDeepLink;
            }}
          >
            <FormattedMessage id="AccountConnectors.metaMaskBrowser" />
          </Button>
        </div>
      ) : null}

      {isDev
        ? connectors.map((connector) => (
            <div key={connector.id}>
              <Button
                onClick={async () => {
                  try {
                    await connector.connect();
                    onConnect();
                  } catch (error) {
                    debug(error);
                    showCannotConnectMessage();
                  }
                }}
              >
                {connector.name}
              </Button>
            </div>
          ))
        : null}
    </Flex>
  );
};
