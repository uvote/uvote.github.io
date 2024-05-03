import { Footer } from "_/components/Footer";
import { Main, Title, TopBar } from "_/components/library";
import { PollDetails } from "_/components/PollDetails";
import { FC } from "react";
import { FormattedMessage } from "react-intl";
import { useParams } from "react-router-dom";
import { Content } from "trunx";

const PollPage: FC = () => {
  const params = useParams();

  let cannotUsePollId;
  let pollId;

  try {
    if (params.pollId) pollId = BigInt(params.pollId);
    if (pollId !== undefined && pollId <= 0) cannotUsePollId = true;
  } catch (_ignore) {
    cannotUsePollId = true;
  }

  return (
    <>
      <TopBar />

      <Main>
        <Content>
          <Title>
            <FormattedMessage id="PollPage.title" />
          </Title>

          {pollId ? <PollDetails pollId={pollId} /> : null}

          {cannotUsePollId ? (
            <FormattedMessage id="PollPage.invalidPollId" />
          ) : null}
        </Content>
      </Main>

      <Footer />
    </>
  );
};

export default PollPage;
