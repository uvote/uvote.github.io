import { HomeSection } from "_/components/HomeSection";
import { PollPreview } from "_/components/PollPreview";
import { pathname } from "_/mockup/routing/pathnames";
import { FC } from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";

export const HypeSection: FC = () => {
  const { formatMessage } = useIntl();
  const navigate = useNavigate();

  return (
    <HomeSection
      color="primary-d"
      ctaOnClick={() => {
        navigate(pathname.listPolls());
      }}
      ctaText={formatMessage({ id: "HypeSection.ctaText" })}
      title={formatMessage({ id: "HypeSection.title" })}
    >
      <PollPreview pollId={1n} />
      <PollPreview pollId={2n} />
    </HomeSection>
  );
};
