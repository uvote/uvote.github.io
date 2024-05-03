import { pathname } from "_/routing/pathnames";
import { useReadPollFactoryBasicReadPollDetails } from "_/wagmi/generated";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  pollId: bigint;
};

export const PollPreview: FC<Props> = ({ pollId }) => {
  const navigate = useNavigate();
  const { data } = useReadPollFactoryBasicReadPollDetails({ args: [pollId] });

  return (
    <div
      onClick={() => {
        navigate(pathname.poll(pollId));
      }}
    >
      {data?.title ?? ""}
    </div>
  );
};
