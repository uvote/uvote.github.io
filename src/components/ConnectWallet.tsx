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
  const { detectProviderIsDone, hasAccount } = useContext(EthereumContext);
  const { connectWalletModalIsActive, setConnectWalletModalIsActive } =
    useContext(ConnectWalletContext);

  const onClick = useCallback(() => {
    if (hasAccount) return;
    setConnectWalletModalIsActive(true);
  }, [hasAccount, setConnectWalletModalIsActive]);

  const closeModal = useCallback(() => {
    setConnectWalletModalIsActive(false);
  }, [setConnectWalletModalIsActive]);

  useStopScroll(connectWalletModalIsActive);

  // Wait until detectProvider is done.
  if (!detectProviderIsDone) return null;

  if (hasAccount) {
    return (
      <Button color="ghost" size="small" onClick={onClick}>
        Connected
      </Button>
    );
  }

  return (
    <>
      <Button size="small" onClick={onClick}>
        <FormattedMessage id="ConnectWallet.label" />
      </Button>

      <Modal isActive={connectWalletModalIsActive}>
        <ModalBackground onClick={closeModal} />

        <ModalContent>
          <Message
            header={
              <>
                <p>Connect a Wallet</p>
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
        </ModalContent>
      </Modal>
    </>
  );
};
