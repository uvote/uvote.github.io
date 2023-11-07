import { useOfflineDetection } from "_/hooks/useOfflineDetection";
import { classNames } from "_/styles/classNames";
import { FC, PropsWithChildren } from "react";
import { FormattedMessage } from "react-intl";
import { Container, Message } from "trunx";

export const Main: FC<PropsWithChildren> = ({ children }) => {
  const isOffline = useOfflineDetection();
  console.log("isOffline", isOffline);

  return (
    <main className={classNames("Main__container", "px-2", "py-4")}>
      <Container>
        {isOffline ? (
          <Message color="warning">
            <FormattedMessage id="Main.noNetwork" />
          </Message>
        ) : null}

        {children}
      </Container>
    </main>
  );
};
