import { AccountConnectors } from "_/components/AccountConnectors";
import { ConnectedAccount } from "_/components/ConnectedAccount";
import { Footer } from "_/components/Footer";
import { Main } from "_/components/library";
import { Nav } from "_/components/Nav";
import { FC } from "react";
import { Content } from "trunx";
import { useAccount } from "wagmi";

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
