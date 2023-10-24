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
type ConnectButtonClassName = "ConnectButton__address";
type MainClassName = "Main__container";
type TopBarClassName =
  | "TopBar__content"
  | "TopBar--primary-a"
  | "TopBar--primary-b"
  | "TopBar--primary-c"
  | "TopBar--primary-d";

type ComponentClassName =
  | BoxClassName
  | ConnectButtonClassName
  | MainClassName
  | TopBarClassName;

type ClassName = BulmaClassName | ComponentClassName;

export const classNames = (...args: ClassNamesArg<ClassName>[]) =>
  _classNames(...args);
