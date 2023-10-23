import {
  BulmaClassName,
  classNames as _classNames,
  ClassNamesArg,
} from "trunx";

type BoxClassName =
  | "Box--primary-a"
  | "Box--primary-b"
  | "Box--primary-c"
  | "Box--primary-d";
type MainClassName = "Main__container";
type TopBarClassName =
  | "TopBar--primary-a"
  | "TopBar--primary-b"
  | "TopBar--primary-c"
  | "TopBar--primary-d";

type ClassName =
  | BulmaClassName
  | BoxClassName
  | MainClassName
  | TopBarClassName;

export const classNames = (...args: ClassNamesArg<ClassName>[]) =>
  _classNames(...args);
