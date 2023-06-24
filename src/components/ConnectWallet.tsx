import { FC, useCallback, useContext } from "react";
import { FormattedMessage } from "react-intl";
import {
  Button,
  ButtonDelete,
  Flex,
  Message,
  Modal,
  ModalBackground,
  ModalContent,
} from "trunx";

import { ConnectWalletContext } from "../contexts/ConnectWallet";
import { EthereumContext } from "../contexts/Ethereum";
import { useStopScroll } from "../hooks/useStopScroll";
import { ConnectMetaMask } from "./ConnectMetaMask";
import { OpenMetaMaskBrowser } from "./OpenMetaMaskBrowser";

export const ConnectWallet: FC = () => {
  const { detectProviderIsDone, isConnected, isEthereumNetwork } =
    useContext(EthereumContext);
  const { connectWalletModalIsActive, setConnectWalletModalIsActive } =
    useContext(ConnectWalletContext);

  const onClick = useCallback(() => {
    setConnectWalletModalIsActive(true);
  }, [setConnectWalletModalIsActive]);

  const closeModal = useCallback(() => {
    setConnectWalletModalIsActive(false);
  }, [setConnectWalletModalIsActive]);

  useStopScroll(connectWalletModalIsActive);

  // Wait until detectProvider is done.
  if (!detectProviderIsDone) return null;

  if (isConnected && isEthereumNetwork) {
    return (
      <Button color="ghost" size="small">
        <FormattedMessage id="ConnectWallet.connected" />
      </Button>
    );
  }

  return (
    <>
      <Button size="small" onClick={onClick}>
        <FormattedMessage id="ConnectWallet.connect" />
      </Button>

      <Modal isActive={connectWalletModalIsActive}>
        <ModalBackground onClick={closeModal} />

        <ModalContent>
          {isConnected && !isEthereumNetwork ? (
            <Message
              color="warning"
              header={
                <>
                  <FormattedMessage id="ConnectWallet.connectedToUnsopportedNetworkTitle" />
                  <ButtonDelete onClick={closeModal} />
                </>
              }
            >
              <p>
                <FormattedMessage id="ConnectWallet.pleaseSelectEthereumNetwork" />
              </p>
            </Message>
          ) : (
            <Message
              header={
                <>
                  <FormattedMessage id="ConnectWallet.connectModalTitle" />
                  <ButtonDelete onClick={closeModal} />
                </>
              }
            >
              <Flex direction="column">
                <div>
                  <ConnectMetaMask />
                </div>

                <div>
                  <OpenMetaMaskBrowser />
                </div>
              </Flex>
            </Message>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
