import {
  BulmaClassName,
  classNames as _classNames,
  ClassNamesArg,
} from "trunx";

type ClassName = BulmaClassName;

export const classNames = (...args: ClassNamesArg<ClassName>[]) =>
  _classNames(...args);
