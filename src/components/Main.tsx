import { classNames } from "_/styles/classNames";
import { FC, PropsWithChildren } from "react";
import { Container } from "trunx";

export const Main: FC<PropsWithChildren> = ({ children }) => {
  return (
    <main className={classNames("main__container")}>
      <Container>{children}</Container>
    </main>
  );
};
