import { HomeSection, HomeSectionProps } from "_/components/HomeSection";
import { pathname } from "_/mockup/routing/pathnames";
import { FC, PropsWithChildren, useCallback } from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";

export const FindPollSection: FC<PropsWithChildren> = ({ children }) => {
  const { formatMessage } = useIntl();
  const navigate = useNavigate();

  const ctaOnClick = useCallback<
    NonNullable<HomeSectionProps["ctaOnClick"]>
  >(() => {
    navigate(pathname.pollExample1());
  }, [navigate]);

  return (
    <HomeSection
      color="primary-a"
      ctaOnClick={ctaOnClick}
      ctaText={formatMessage({ id: "FindPollSection.ctaText" })}
      title={formatMessage({ id: "FindPollSection.title" })}
    >
      {children}
    </HomeSection>
  );
};
