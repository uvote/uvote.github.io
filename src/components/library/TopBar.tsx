import { classNames } from "_/styles/classNames";
import { PrimaryColor } from "_/styles/colors";
import { FC, PropsWithChildren } from "react";
import { ColorModifierProp, Navbar, NavbarProps } from "trunx";

import { LogoType } from "./Logotype";

export type TopBarProps = Omit<NavbarProps, "color"> &
  ColorModifierProp<PrimaryColor>;

export const TopBar: FC<PropsWithChildren<TopBarProps>> = ({
  children,
  color,
}) => {
  return (
    <Navbar
      className={classNames("is-fixed-top", {
        "has-background-grey": color === undefined,
        "TopBar--primary-a": color === "primary-a",
        "TopBar--primary-b": color === "primary-b",
        "TopBar--primary-c": color === "primary-c",
        "TopBar--primary-d": color === "primary-d",
      })}
    >
      <div className={classNames("TopBar__content")}>
        <LogoType />
        {children}
      </div>
    </Navbar>
  );
};
