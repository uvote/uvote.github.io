import { Footer } from "_/components/Footer";
import { Main } from "_/components/library";
import { ConnectedAccount } from "_/mockup/components/ConnectedAccount";
import { ConnectionBar } from "_/mockup/components/ConnectionBar";
import { FC } from "react";

const ConnectedAccountPage: FC = () => {
  return (
    <>
      <ConnectionBar />

      <Main>
        <ConnectedAccount />
      </Main>

      <Footer />
    </>
  );
};

export default ConnectedAccountPage;
