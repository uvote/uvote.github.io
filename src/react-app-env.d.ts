/// <reference types="react-scripts" />
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production";
    PUBLIC_URL: string;
    REACT_APP_VERSION: string;
  }
}

interface Window {
  /**
   * Possible Etherum provider.
   *
   * Providers have been made available as window.ethereum in web browsers, but
   * this convention is not part of the specification.
   *
   * See also {@link https://eips.ethereum.org/EIPS/eip-1193}
   */
  ethereum: unknown;
}
