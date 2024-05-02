import { routePath } from "_/routing/routes";

export const pathname = {
  about: () => routePath.about,
  account: () => routePath.account,
  home: () => routePath.home,
  poll: (pollId: bigint) => routePath.poll.replace(":pollId", String(pollId)),
};
