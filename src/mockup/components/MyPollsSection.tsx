import { HomeSection } from "_/components/HomeSection";
import { FC, PropsWithChildren } from "react";
import { useIntl } from "react-intl";

export const MyPollsSection: FC<PropsWithChildren> = ({ children }) => {
  const { formatMessage } = useIntl();
  return (
    <HomeSection
      color="primary-c"
      ctaText={formatMessage({ id: "MyPollsSection.ctaText" })}
      title={formatMessage({ id: "MyPollsSection.title" })}
    >
      {children}
    </HomeSection>
  );
};
