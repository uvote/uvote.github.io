import { AccountConnectors } from "_/components/AccountConnectors";
import { ConnectedAccount } from "_/components/ConnectedAccount";
import { Footer } from "_/components/Footer";
import { Main, TopBar } from "_/components/library";
import { pathname } from "_/routing/pathnames";
import { FC, useCallback } from "react";
import { useAccount } from "wagmi";

const AccountPage: FC = () => {
  const { isConnected } = useAccount();

  const onConnect = useCallback(() => {
    window.location.href = pathname.home();
  }, []);

  return (
    <>
      <TopBar />

      <Main>
        {isConnected ? (
          <ConnectedAccount />
        ) : (
          <AccountConnectors onConnect={onConnect} />
        )}
      </Main>

      <Footer />
    </>
  );
};

export default AccountPage;
