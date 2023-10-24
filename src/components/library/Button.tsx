import { FC, PropsWithChildren } from "react";
import {
  Button as _Button,
  ButtonProps as _ButtonProps,
  ColorModifierProp,
  MainColor,
} from "trunx";

export type ButtonProps = Omit<_ButtonProps, "color" | "isRounded"> &
  ColorModifierProp<Extract<MainColor, "warning" | "success">>;

export const Button: FC<PropsWithChildren<ButtonProps>> = ({
  children,
  ...props
}) => {
  return (
    <_Button isRounded {...props}>
      {children}
    </_Button>
  );
};
