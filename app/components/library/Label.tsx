import { FC } from "react";
import { Label as _Label, LabelProps as _LabelProps } from "trunx";

type LabelProps = Omit<_LabelProps, "size">;

export const Label: FC<LabelProps> = ({ children, ...props }) => {
  return (
    <_Label size="medium" {...props}>
      {children}
    </_Label>
  );
};
