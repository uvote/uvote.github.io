import { routePath } from "_/mockup/routing/routes";
import { FC } from "react";
import { Link } from "react-router-dom";

const Index: FC = () => {
  return <Link to={routePath.gallery()}>Gallery</Link>;
};

export default Index;
