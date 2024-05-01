import { Footer } from "_/components/Footer";
import { Main, Title, TopBar } from "_/components/library";
import { FC } from "react";
import { FormattedMessage } from "react-intl";
import { Content } from "trunx";

const AboutPage: FC = () => {
  return (
    <>
      <TopBar />

      <Main>
        <Content>
          <Title>
            <FormattedMessage id="AboutPage.title" />
          </Title>
        </Content>
      </Main>

      <Footer />
    </>
  );
};

export default AboutPage;
