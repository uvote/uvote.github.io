import { AccountConnectors } from "_/components/AccountConnectors";
import { ConnectedAccount } from "_/components/ConnectedAccount";
import { Footer } from "_/components/Footer";
import { Main, TopBar } from "_/components/library";
import { FC } from "react";
import { useAccount } from "wagmi";

const AccountPage: FC = () => {
  const { isConnected } = useAccount();

  return (
    <>
      <TopBar />
      <Main>{isConnected ? <ConnectedAccount /> : <AccountConnectors />}</Main>
      <Footer />
    </>
  );
};

export default AccountPage;
