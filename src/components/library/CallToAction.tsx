import { classNames } from "_/styles/classNames";
import { FC } from "react";
import { Button, ButtonProps } from "trunx";

type Props = Omit<ButtonProps, "color" | "className"> & {
  text: string;
};

export const CallToAction: FC<Props> = ({ text, ...props }) => {
  return (
    <Button color="ghost" {...props}>
      <span className={classNames("is-uppercase")}>{text}</span>
    </Button>
  );
};
