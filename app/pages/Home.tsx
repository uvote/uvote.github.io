import { ConnectionBar } from "_/components/ConnectionBar";
import { CreateSection } from "_/components/CreateSection";
import { FindPollSection } from "_/components/FindPollSection";
import { Footer } from "_/components/Footer";
import { HypeSection } from "_/components/HypeSection";
import { Column, Columns, Main } from "_/components/library";
import { MyPollsSection } from "_/components/MyPollsSection";
import { FC } from "react";

const HomePage: FC = () => {
  return (
    <>
      <ConnectionBar />

      <Main>
        <Columns>
          <Column>
            <FindPollSection getPollUrl={() => undefined} />
            <HypeSection />
          </Column>

          <Column>
            <CreateSection />
            <MyPollsSection getMyPollsUrl={() => undefined} />
          </Column>
        </Columns>
      </Main>

      <Footer />
    </>
  );
};

export default HomePage;
