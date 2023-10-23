import { classNames } from "_/styles/classNames";
import { FC, PropsWithChildren } from "react";
import { Container } from "trunx";

export const Main: FC<PropsWithChildren> = ({ children }) => {
  return (
    <main className={classNames("Main__container", "px-2", "py-4")}>
      <Container>{children}</Container>
    </main>
  );
};
