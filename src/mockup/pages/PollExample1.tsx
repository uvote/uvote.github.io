import { Footer } from "_/components/Footer";
import { Main } from "_/components/library";
import { ConnectionBar } from "_/mockup/components/ConnectionBar";
import { pollExample1 } from "_/mockup/fixtures/polls";
import { FC } from "react";

const PollExample1Page: FC = () => {
  return (
    <>
      <ConnectionBar />

      <Main>
        <p>{pollExample1.text}</p>
      </Main>

      <Footer />
    </>
  );
};

export default PollExample1Page;
