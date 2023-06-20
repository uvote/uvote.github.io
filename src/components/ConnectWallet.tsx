import { FC, useState, useCallback } from "react";
import {
  Button,
  ButtonDelete,
  Flex,
  Message,
  Modal,
  ModalBackground,
  ModalContent,
} from "trunx";
import { useStopScroll } from "../hooks/useStopScroll";
import { ConnectMetaMask } from "./ConnectMetaMask";
import { OpenMetaMaskBrowser } from "./OpenMetaMaskBrowser";

const label = "Connect";
const title = "Connect a Wallet";

export const ConnectWallet: FC = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleModal = useCallback(() => {
    setIsActive((active) => !active);
  }, []);

  useStopScroll(isActive);

  return (
    <>
      <Button onClick={toggleModal}>{label}</Button>

      <Modal isActive={isActive}>
        <ModalBackground onClick={toggleModal} />

        <ModalContent>
          <Message
            header={
              <>
                <p>{title}</p>
                <ButtonDelete onClick={toggleModal} />
              </>
            }
          >
            <Flex direction="column">
              <ConnectMetaMask />

              <OpenMetaMaskBrowser />
            </Flex>
          </Message>
        </ModalContent>
      </Modal>
    </>
  );
};
