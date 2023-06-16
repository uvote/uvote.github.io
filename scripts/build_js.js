import * as esbuild from "esbuild";

await esbuild.build({
  bundle: true,
  entryPoints: ["src/App.tsx"],
  define: {
    "process.env.NODE_ENV": "'production'",
  },
  outdir: "public",
});
