import { Main, Title } from "_/components/library";
import { routePath } from "_/mockup/routing/routes";
import { FC } from "react";
import { Link } from "react-router-dom";

const Index: FC = () => {
  return (
    <Main>
      <Title>uvote mockups</Title>

      <ul>
        <li>
          <Link to={routePath.home()}>HomePage</Link>
        </li>
      </ul>
    </Main>
  );
};

export default Index;
