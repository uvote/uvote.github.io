import { classNames } from "_/styles/classNames";
import { PrimaryColor } from "_/styles/colors";
import { FC, PropsWithChildren } from "react";
import { Box as _Box, BoxProps as _BoxProps, ColorModifierProp } from "trunx";

export type BoxProps = Omit<_BoxProps, "className"> &
  ColorModifierProp<PrimaryColor>;

export const Box: FC<PropsWithChildren<BoxProps>> = ({
  children,
  color,
  ...props
}) => {
  const className = color ? classNames(`Box--${color}`) : undefined;
  return (
    <_Box className={className} {...props}>
      {children}
    </_Box>
  );
};
