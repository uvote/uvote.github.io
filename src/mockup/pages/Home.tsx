import { Footer } from "_/components/Footer";
import { Column, Columns, Main } from "_/components/library";
import { Nav } from "_/components/Nav";
import { CreateSection } from "_/mockup/components/CreateSection";
import { HypeSection } from "_/mockup/components/HypeSection";
import { MyPollsSection } from "_/mockup/components/MyPollsSection";
import { VoteSection } from "_/mockup/components/VoteSection";
import { FC } from "react";

const HomePage: FC = () => {
  return (
    <>
      <Nav showAccount />

      <Main>
        <Columns>
          <Column>
            <VoteSection />
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
