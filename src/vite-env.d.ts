/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly WALLET_CONNECT_PROJECT_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
