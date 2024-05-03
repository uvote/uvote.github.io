const textEncoder = new TextEncoder();

export const stringBytesLength = (value: string) =>
  textEncoder.encode(value).length;
