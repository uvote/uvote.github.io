import {
  BulmaClassName,
  classNames as _classNames,
  ClassNamesArg,
} from "trunx";

// Component library.

type Box =
  | "Box--primary-a"
  | "Box--primary-b"
  | "Box--primary-c"
  | "Box--primary-d";
type ConnectButton = "ConnectButton__address";
type Main = "Main__container";
type TopBar =
  | "TopBar__content"
  | "TopBar--primary-a"
  | "TopBar--primary-b"
  | "TopBar--primary-c"
  | "TopBar--primary-d";

type ComponentLibraryClassName = Box | ConnectButton | Main | TopBar;

// Other components.

type FindPollSection = "FindPollSection__input" | "FindPollSection__label";

type ComponentClassName = FindPollSection;

type ClassName =
  | BulmaClassName
  | ComponentClassName
  | ComponentLibraryClassName;

export const classNames = (...args: ClassNamesArg<ClassName>[]) =>
  _classNames(...args);
