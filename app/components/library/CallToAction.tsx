import { classNames } from "_/styles/classNames";
import { FC } from "react";
import { Button, ButtonProps, Flex } from "trunx";

import { Icon } from "./Icon";

export type CallToActionProps = Omit<ButtonProps, "color" | "className"> & {
  text: string;
};

export const CallToAction: FC<CallToActionProps> = ({ text, ...props }) => {
  return (
    <Button color="ghost" {...props}>
      <Flex direction="row" alignItems="center">
        <span className={classNames("is-uppercase", "mr-3")}>{text}</span>
        <Icon name="next" />
      </Flex>
    </Button>
  );
};
