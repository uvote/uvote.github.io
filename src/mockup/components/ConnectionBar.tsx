import { Button, TopBar, TopBarProps } from "_/components/library";
import { FC } from "react";

type Props = Pick<TopBarProps, "color">;

export const ConnectionBar: FC<Props> = ({ color }) => {
  return (
    <TopBar color={color}>
      <Button color="warning">Connect</Button>
    </TopBar>
  );
};
