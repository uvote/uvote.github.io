import { FC, PropsWithChildren } from "react";

export const PageContent: FC<PropsWithChildren> = ({ children }) => {
  return <main className="page-content">{children}</main>;
};
