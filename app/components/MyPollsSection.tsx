import { HomeSection, HomeSectionProps } from "_/components/HomeSection";
import { pathname } from "_/mockup/routing/pathnames";
import { FC, useCallback } from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";

type Props = {
  getMyPollsUrl: () => string | undefined;
};

export const MyPollsSection: FC<Props> = ({ getMyPollsUrl }) => {
  const { formatMessage } = useIntl();
  const navigate = useNavigate();

  const ctaOnClick = useCallback<
    NonNullable<HomeSectionProps["ctaOnClick"]>
  >(() => {
    const target = getMyPollsUrl();
    if (!target) return;
    navigate(pathname.myPolls());
  }, [navigate, getMyPollsUrl]);

  return (
    <HomeSection
      color="primary-c"
      ctaOnClick={ctaOnClick}
      ctaText={formatMessage({ id: "MyPollsSection.ctaText" })}
      title={formatMessage({ id: "MyPollsSection.title" })}
    />
  );
};
