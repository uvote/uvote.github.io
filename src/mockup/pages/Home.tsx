import { FindPollSection } from "_/components/FindPollSection";
import { Footer } from "_/components/Footer";
import { Column, Columns, Main } from "_/components/library";
import { ConnectionBar } from "_/mockup/components/ConnectionBar";
import { CreateSection } from "_/mockup/components/CreateSection";
import { HypeSection } from "_/mockup/components/HypeSection";
import { MyPollsSection } from "_/mockup/components/MyPollsSection";
import { pathname } from "_/mockup/routing/pathnames";
import { FC } from "react";

const HomePage: FC = () => {
  return (
    <>
      <ConnectionBar />

      <Main>
        <Columns>
          <Column>
            <FindPollSection target={pathname.pollExample1} />
            <HypeSection />
          </Column>

          <Column>
            <CreateSection />
            <MyPollsSection />
          </Column>
        </Columns>
      </Main>

      <Footer />
    </>
  );
};

export default HomePage;
