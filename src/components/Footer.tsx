import { FC } from "react";
import { Link } from "react-router-dom";
import { Content } from "trunx";

import { gitHubOrganizationUrl } from "../locators";
import metadata from "../metadata.json";
import { routePath } from "../routing/routes";
import { npmVersion, versionName } from "../version";

const about = "About";
const gitHub = "GitHub";
const madeInItaly = "Made in Italy by yet another GG-team";

export const Footer: FC = () => {
  return (
    <footer className="footer">
      <Content>
        <p>
          {metadata.unicodeName} {versionName} {npmVersion}
          <br />
          <sub>{madeInItaly}</sub>
        </p>

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
