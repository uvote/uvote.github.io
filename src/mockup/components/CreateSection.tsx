import { HomeSection, HomeSectionProps } from "_/components/HomeSection";
import { pathname } from "_/mockup/routing/pathnames";
import { FC, PropsWithChildren, useCallback } from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";

export const CreateSection: FC<PropsWithChildren> = ({ children }) => {
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
      {children}
    </HomeSection>
  );
};
