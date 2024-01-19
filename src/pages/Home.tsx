import { ConnectionBar } from "_/components/ConnectionBar";
import { CreateSection } from "_/components/CreateSection";
import { Footer } from "_/components/Footer";
import { Column, Columns, Main } from "_/components/library";
import { FC } from "react";

const HomePage: FC = () => {
  return (
    <>
      <ConnectionBar />

      <Main>
        <Columns>
          <Column />

          <Column>
            <CreateSection />
          </Column>
        </Columns>
      </Main>

      <Footer />
    </>
  );
};

export default HomePage;
