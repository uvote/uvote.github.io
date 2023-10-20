import { Footer } from "_/components/Footer";
import { Main, Title } from "_/components/library";
import { Nav } from "_/components/Nav";
import { FC } from "react";
import { Content } from "trunx";

const title = "Page not found";

const PageNotFound: FC = () => {
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

export default PageNotFound;
