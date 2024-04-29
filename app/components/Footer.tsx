import { gitHubOrganizationUrl } from "_/locators";
import { pathname } from "_/routing/pathnames";
import { npmVersion, versionName } from "_/version";
import { FC } from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { Content } from "trunx";

export const Footer: FC = () => {
  return (
    <footer className="footer">
      <Content>
        <span>
          <FormattedMessage
            id="Footer.title"
            values={{ versionName, version: npmVersion }}
          />
        </span>

        <br />

        <span>
          <FormattedMessage id="Footer.subtitle" />
        </span>

        <ul>
          <li>
            <Link to={pathname.about()}>
              <FormattedMessage id="AboutPage.title" />
            </Link>
          </li>

          <li>
            <a href={gitHubOrganizationUrl}>
              <FormattedMessage id="Footer.GitHub" />
            </a>
          </li>
        </ul>
      </Content>
    </footer>
  );
};
