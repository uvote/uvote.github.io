import { HomeSection } from "_/components/HomeSection";
import { FC, PropsWithChildren } from "react";
import { useIntl } from "react-intl";

export const VoteSection: FC<PropsWithChildren> = ({ children }) => {
  const { formatMessage } = useIntl();
  return (
    <HomeSection
      color="primary-a"
      ctaText={formatMessage({ id: "VoteSection.ctaText" })}
      title={formatMessage({ id: "VoteSection.title" })}
    >
      {children}
    </HomeSection>
  );
};
