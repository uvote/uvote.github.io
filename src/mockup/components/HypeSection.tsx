import { HomeSection } from "_/components/HomeSection";
import { FC, PropsWithChildren } from "react";
import { useIntl } from "react-intl";

export const HypeSection: FC<PropsWithChildren> = ({ children }) => {
  const { formatMessage } = useIntl();
  return (
    <HomeSection
      ctaText={formatMessage({ id: "HypeSection.ctaText" })}
      title={formatMessage({ id: "HypeSection.title" })}
    >
      {children}
    </HomeSection>
  );
};
