import {
  BulmaClassName,
  ClassNamesArg,
  classNames as _classNames,
} from "trunx";

type ClassName = BulmaClassName;

export const classNames = (...args: ClassNamesArg<ClassName>[]) =>
  _classNames(...args);
