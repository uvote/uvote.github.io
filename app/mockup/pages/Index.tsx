import { Main, Title, TopBar } from "_/components/library";
import { pathname } from "_/mockup/routing/pathnames";
import { FC } from "react";
import { Link } from "react-router-dom";

const Index: FC = () => {
  return (
    <>
      <TopBar />

      <Main>
        <Title>Mockups</Title>

        <ul>
          <li>
            <Link to={pathname.home()}>Homepage</Link>
          </li>

          <li>
            <Link to={pathname.connectedAccount()}>Connected account</Link>
          </li>

          <li>
            <Link to={pathname.createPoll()}>Create poll</Link>
          </li>

          <li>
            <Link to={pathname.listPolls()}>List polls</Link>
          </li>

          <li>
            <Link to={pathname.pollExample1()}>Poll example 1</Link>
          </li>
        </ul>
      </Main>
    </>
  );
};

export default Index;
