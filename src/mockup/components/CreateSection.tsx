import { HomeSection } from "_/components/HomeSection";
import { FC, PropsWithChildren } from "react";
import { useIntl } from "react-intl";

export const CreateSection: FC<PropsWithChildren> = ({ children }) => {
  const { formatMessage } = useIntl();
  return (
    <HomeSection
      ctaText={formatMessage({ id: "CreateSection.ctaText" })}
      title={formatMessage({ id: "CreateSection.title" })}
    >
      {children}
    </HomeSection>
  );
};
