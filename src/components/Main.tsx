import { FC, PropsWithChildren } from "react";
import { Container } from "trunx";

import { classNames } from "../styles/classNames";

export type MainClassName = "main__container";

export const Main: FC<PropsWithChildren> = ({ children }) => {
  return (
    <main className={classNames("main__container")}>
      <Container>{children}</Container>
    </main>
  );
};
