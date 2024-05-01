import { Footer } from "_/components/Footer";
import { Flex, Main, Title } from "_/components/library";
import { ConnectionBar } from "_/mockup/components/ConnectionBar";
import { classNames } from "_/styles/classNames";
import { FC } from "react";
import { FormattedMessage } from "react-intl";

const CreatePollPage: FC = () => {
  return (
    <>
      <ConnectionBar color="primary-b" />

      <Main>
        <Flex justify="center">
          <Title className={classNames("is-uppercase")}>
            <FormattedMessage id="CreatePollPage.title" />
          </Title>
        </Flex>
      </Main>

      <Footer />
    </>
  );
};

export default CreatePollPage;
