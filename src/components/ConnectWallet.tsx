import { FC, useCallback, useContext } from "react";
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
import { useStopScroll } from "../hooks/useStopScroll";
import { ConnectMetaMask } from "./ConnectMetaMask";
import { OpenMetaMaskBrowser } from "./OpenMetaMaskBrowser";

const label = "Connect";
const title = "Connect a Wallet";

export const ConnectWallet: FC = () => {
  const { connectWalletModalIsActive, setConnectWalletModalIsActive } =
    useContext(ConnectWalletContext);

  const openModal = useCallback(() => {
    setConnectWalletModalIsActive(true);
  }, [setConnectWalletModalIsActive]);

  const closeModal = useCallback(() => {
    setConnectWalletModalIsActive(false);
  }, [setConnectWalletModalIsActive]);

  useStopScroll(connectWalletModalIsActive);

  return (
    <>
      <Button onClick={openModal}>{label}</Button>

      <Modal isActive={connectWalletModalIsActive}>
        <ModalBackground onClick={closeModal} />

        <ModalContent>
          <Message
            header={
              <>
                <p>{title}</p>
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
