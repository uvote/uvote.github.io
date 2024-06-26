import { FC, ReactNode, useId } from "react";
import { Control, Field, Help, Input, InputProps } from "trunx";

import { Label } from "./Label";

export type InputFieldProps = Omit<InputProps, "id"> & {
  help?: ReactNode;
  label: string;
};

export const InputField: FC<InputFieldProps> = ({
  color,
  help,
  label,
  ...props
}) => {
  const id = useId();

  return (
    <Field>
      <Label htmlFor={id}>{label}</Label>

      <Control>
        <Input id={id} color={color} {...props} />
      </Control>

      {help ? <Help color={color}>{help}</Help> : null}
    </Field>
  );
};
