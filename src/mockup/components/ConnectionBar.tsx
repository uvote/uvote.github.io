import { TopBar, TopBarProps } from "_/components/library";
import { ConnectButton } from "_/mockup/components/ConnectButton";
import { FC } from "react";

type Props = Pick<TopBarProps, "color">;

export const ConnectionBar: FC<Props> = ({ color }) => {
  return (
    <TopBar color={color}>
      <ConnectButton />
    </TopBar>
  );
};
