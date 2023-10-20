import { Footer } from "_/components/Footer";
import { Title } from "_/components/library";
import { Main } from "_/components/Main";
import { Nav } from "_/components/Nav";
import { FC } from "react";
import { Content } from "trunx";

const title = "About uVote";

const AboutPage: FC = () => {
  return (
    <>
      <Nav />

      <Main>
        <Content>
          <Title>{title}</Title>
        </Content>
      </Main>

      <Footer />
    </>
  );
};

export default AboutPage;
