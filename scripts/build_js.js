import * as esbuild from "esbuild";

await esbuild.build({
  bundle: true,
  entryPoints: ["src/uVote.tsx"],
  define: {
    "process.env.NODE_ENV": "'production'",
  },
  minify: true,
  outfile: "public/uvote.js",
});
