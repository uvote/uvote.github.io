import { Footer } from "_/components/Footer";
import { Flex, Main, Tabs, Title } from "_/components/library";
import { ConnectionBar } from "_/mockup/components/ConnectionBar";
import { classNames } from "_/styles/classNames";
import { FC } from "react";
import { FormattedMessage } from "react-intl";

const MyPollsPage: FC = () => {
  return (
    <>
      <ConnectionBar color="primary-c" />

      <Main>
        <Flex justify="center">
          <Title className={classNames("is-uppercase")}>
            <FormattedMessage id="MyPollsPage.title" />
          </Title>
        </Flex>

        <Tabs isCentered size="large">
          <ul>
            <li>
              <a href=""> Created </a>
            </li>

            <li>
              <a href=""> Voted </a>
            </li>
          </ul>
        </Tabs>
      </Main>

      <Footer />
    </>
  );
};

export default MyPollsPage;
