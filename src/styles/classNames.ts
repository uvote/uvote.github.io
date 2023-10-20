import {
  BulmaClassName,
  classNames as _classNames,
  ClassNamesArg,
} from "trunx";

type MainClassName = "main__container";

type ClassName = BulmaClassName | MainClassName;

export const classNames = (...args: ClassNamesArg<ClassName>[]) =>
  _classNames(...args);
