import { routePath } from "../routing/routes";

export const pathname = {
  about: () => routePath.about(),
  account: () => routePath.account(),
  home: () => routePath.home(),
};
