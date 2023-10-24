import { HomeSection, HomeSectionProps } from "_/components/HomeSection";
import { pathname } from "_/mockup/routing/pathnames";
import { FC, PropsWithChildren, useCallback } from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";

export const MyPollsSection: FC<PropsWithChildren> = ({ children }) => {
  const { formatMessage } = useIntl();
  const navigate = useNavigate();

  const ctaOnClick = useCallback<
    NonNullable<HomeSectionProps["ctaOnClick"]>
  >(() => {
    navigate(pathname.myPolls());
  }, [navigate]);

  return (
    <HomeSection
      color="primary-c"
      ctaOnClick={ctaOnClick}
      ctaText={formatMessage({ id: "MyPollsSection.ctaText" })}
      title={formatMessage({ id: "MyPollsSection.title" })}
    >
      {children}
    </HomeSection>
  );
};
