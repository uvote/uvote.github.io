import { ConnectionBar } from "_/components/ConnectionBar";
import { CreatePollForm } from "_/components/CreatePollForm";
import { Footer } from "_/components/Footer";
import { Flex, Main, Title } from "_/components/library";
import { FC } from "react";
import { FormattedMessage } from "react-intl";

const CreatePollPage: FC = () => {
  return (
    <>
      <ConnectionBar color="primary-b" />

      <Main>
        <Flex justify="center">
          <Title>
            <FormattedMessage id="CreatePollPage.title" />
          </Title>
        </Flex>

        <CreatePollForm />
      </Main>

      <Footer />
    </>
  );
};

export default CreatePollPage;
