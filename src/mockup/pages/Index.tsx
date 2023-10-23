import { Main, Title } from "_/components/library";
import { pathname } from "_/mockup/routing/pathnames";
import { FC } from "react";
import { Link } from "react-router-dom";

const Index: FC = () => {
  return (
    <Main>
      <Title>uvote mockups</Title>

      <ul>
        <li>
          <Link to={pathname.home()}>Homepage</Link>
        </li>

        <li>
          <Link to={pathname.createPoll()}>Create poll</Link>
        </li>
      </ul>
    </Main>
  );
};

export default Index;
