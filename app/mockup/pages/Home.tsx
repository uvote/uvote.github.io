import { CreateSection } from "_/components/CreateSection";
import { FindPollSection } from "_/components/FindPollSection";
import { Footer } from "_/components/Footer";
import { HypeSection } from "_/components/HypeSection";
import { Column, Columns, Main } from "_/components/library";
import { MyPollsSection } from "_/components/MyPollsSection";
import { ConnectionBar } from "_/mockup/components/ConnectionBar";
import { pathname } from "_/mockup/routing/pathnames";
import { FC } from "react";

const HomePage: FC = () => {
  const getPollUrl = () => pathname.pollExample1();
  const getMyPollsUrl = () => pathname.myPolls();

  return (
    <>
      <ConnectionBar />

      <Main>
        <Columns>
          <Column>
            <FindPollSection getPollUrl={getPollUrl} />
            <HypeSection />
          </Column>

          <Column>
            <CreateSection />
            <MyPollsSection getMyPollsUrl={getMyPollsUrl} />
          </Column>
        </Columns>
      </Main>

      <Footer />
    </>
  );
};

export default HomePage;
