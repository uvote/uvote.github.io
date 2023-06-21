import { FC } from "react";
import { Content } from "trunx";

import { Footer } from "../components/Footer";
import { Main } from "../components/Main";
import { Nav } from "../components/Nav";

const title = "Page not found";

const PageNotFound: FC = () => {
  return (
    <>
      <Nav />

      <Main>
        <Content>
          <h1>{title}</h1>
        </Content>
      </Main>

      <Footer />
    </>
  );
};

export default PageNotFound;
