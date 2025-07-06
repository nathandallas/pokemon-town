import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  root: "src",
  base: process.env.NODE_ENV === "production" ? "/pokemon-town/" : "/",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: resolve(__dirname, "src/index.html"), // Outputs to dist/index.html
      },
    },
  },
});
