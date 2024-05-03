import { useReadPollFactoryBasicReadPollDetails } from "_/wagmi/generated";
import { FC } from "react";

type Props = {
  pollId: bigint;
};

export const PollDetails: FC<Props> = ({ pollId }) => {
  const { data } = useReadPollFactoryBasicReadPollDetails({ args: [pollId] });

  return (
    <div>
      <div>{data?.title ?? ""}</div>
      <div>{data?.choiceA ?? ""}</div>
      <div>{data?.choiceB ?? ""}</div>
    </div>
  );
};
