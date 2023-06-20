import * as esbuild from "esbuild";

await esbuild.build({
  bundle: true,
  entryPoints: ["src/uVote.tsx"],
  define: {
    "process.env.NODE_ENV": "'production'",
  },
  minify: false,
  outfile: "public/uvote.js",
});
