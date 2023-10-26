import { HomeSection, HomeSectionProps } from "_/components/HomeSection";
import { Input, Label } from "_/components/library";
import { classNames } from "_/styles/classNames";
import { FC, useCallback } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";

type Props = {
  target: () => string;
};

export const FindPollSection: FC<Props> = ({ target }) => {
  const { formatMessage } = useIntl();
  const navigate = useNavigate();

  const ctaOnClick = useCallback<
    NonNullable<HomeSectionProps["ctaOnClick"]>
  >(() => {
    navigate(target());
  }, [navigate, target]);

  return (
    <HomeSection
      color="primary-a"
      ctaOnClick={ctaOnClick}
      ctaText={formatMessage({ id: "FindPollSection.ctaText" })}
      title={formatMessage({ id: "FindPollSection.title" })}
    >
      <Label className={classNames("FindPollSection__label")}>
        <FormattedMessage id="FindPollSection.label" />
      </Label>

      <Input className={classNames("FindPollSection__input")} color="success" />
    </HomeSection>
  );
};
