import { HomeSection, HomeSectionProps } from "_/components/HomeSection";
import { Title } from "_/components/library";
import { pathname } from "_/mockup/routing/pathnames";
import { classNames } from "_/styles/classNames";
import { FC, useCallback } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";

export const CreateSection: FC = () => {
  const { formatMessage } = useIntl();
  const navigate = useNavigate();

  const ctaOnClick = useCallback<
    NonNullable<HomeSectionProps["ctaOnClick"]>
  >(() => {
    navigate(pathname.createPoll());
  }, [navigate]);

  return (
    <HomeSection
      color="primary-b"
      ctaOnClick={ctaOnClick}
      ctaText={formatMessage({ id: "CreateSection.ctaText" })}
      title={formatMessage({ id: "CreateSection.title" })}
    >
      <Title size={5} className={classNames("is-uppercase")}>
        {formatMessage({ id: "CreateSection.subtitle" })}
      </Title>

      <ol>
        <li>
          <FormattedMessage
            id="CreateSection.instruction1"
            values={{
              em: (chunks) => (
                <span className={classNames("has-text-danger")}>{chunks}</span>
              ),
            }}
          />
        </li>

        <li>
          <FormattedMessage
            id="CreateSection.instruction2"
            values={{
              em: (chunks) => <span>{chunks}</span>,
            }}
          />
        </li>

        <li>
          <FormattedMessage id="CreateSection.instruction3" />
        </li>

        <li>
          <FormattedMessage id="CreateSection.instruction4" />
        </li>
      </ol>
    </HomeSection>
  );
};
