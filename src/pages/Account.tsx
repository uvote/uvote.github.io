import { FC } from "react";
import { Content } from "trunx";
import { useAccount } from "wagmi";

import { AccountConnectors } from "../components/AccountConnectors";
import { ConnectedAccount } from "../components/ConnectedAccount";
import { Footer } from "../components/Footer";
import { Main } from "../components/Main";
import { Nav } from "../components/Nav";

const AccountPage: FC = () => {
  const { isConnected } = useAccount();

  return (
    <>
      <Nav />

      <Main>
        <Content>
          {isConnected ? <ConnectedAccount /> : <AccountConnectors />}
        </Content>
      </Main>

      <Footer />
    </>
  );
};

export default AccountPage;
