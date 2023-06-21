import { FC } from "react";
import { Link } from "react-router-dom";
import { Content } from "trunx";

import { gitHubOrganizationUrl } from "../locators";
import { metadata } from "../metadata";
import { routePath } from "../routing";

const about = "About";
const gitHub = "GitHub";
const madeInItaly = "Made in Italy by yet another GG-team";

export const Footer: FC = () => {
  return (
    <footer className="footer">
      <Content>
        <p>{metadata.unicodeName}</p>
        <sub>{madeInItaly}</sub>

        <ul>
          <li>
            <Link to={routePath.about()}>{about}</Link>
          </li>

          <li>
            <a href={gitHubOrganizationUrl}>{gitHub}</a>
          </li>
        </ul>
      </Content>
    </footer>
  );
};
