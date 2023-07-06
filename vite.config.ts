import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    global: "globalThis",
  },
  plugins: [react()],
  preview: {
    port: 8001,
  },
  publicDir: "public",
  resolve: {
    alias: {
      process: "process/browser",
      util: "util",
    },
  },
  server: {
    port: 8000,
  },
});
