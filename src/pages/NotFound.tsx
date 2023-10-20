import { Footer } from "_/components/Footer";
import { Title } from "_/components/library";
import { Main } from "_/components/Main";
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
