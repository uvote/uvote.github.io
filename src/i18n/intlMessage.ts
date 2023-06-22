export type IntlMessage = {
  defaultMessage: string;
  description: string;
};

export const isIntlMessage = (arg: unknown): arg is IntlMessage => {
  if (!arg || typeof arg !== "object") return false;
  const { defaultMessage, description } = arg as Partial<IntlMessage>;
  if (typeof defaultMessage !== "string") return false;
  if (typeof description !== "string") return false;
  if (defaultMessage === "") throw new Error("defaultMessage is empty");
  return true;
};
