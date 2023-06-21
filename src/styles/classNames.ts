import {
  BulmaClassName,
  classNames as _classNames,
  ClassNamesArg,
} from "trunx";

import type { MainClassName } from "../components/Main";

type ClassName = BulmaClassName | MainClassName;

export const classNames = (...args: ClassNamesArg<ClassName>[]) =>
  _classNames(...args);
