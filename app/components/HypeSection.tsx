import { HomeSection, HomeSectionProps } from "_/components/HomeSection";
import { pathname } from "_/mockup/routing/pathnames";
import { FC, PropsWithChildren, useCallback } from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";

export const HypeSection: FC<PropsWithChildren> = ({ children }) => {
  const { formatMessage } = useIntl();
  const navigate = useNavigate();

  const ctaOnClick = useCallback<
    NonNullable<HomeSectionProps["ctaOnClick"]>
  >(() => {
    navigate(pathname.listPolls());
  }, [navigate]);

  return (
    <HomeSection
      color="primary-d"
      ctaOnClick={ctaOnClick}
      ctaText={formatMessage({ id: "HypeSection.ctaText" })}
      title={formatMessage({ id: "HypeSection.title" })}
    >
      {children}
    </HomeSection>
  );
};
