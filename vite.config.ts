import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

const isProd = process.env.NODE_ENV !== "development";

export default defineConfig(() => {
  return {
    base: (isProd) ? "/english_test_home/" : "http://localhost/",
    plugins: [vue()],
    server: {port: 8081},
    resolve: {
      alias: [
        {
          find: "@",
          replacement: resolve(__dirname, "src")
        }
      ]
    },
    build: {
      rollupOptions: {
        input: {
          "index": resolve(__dirname, "index.html"),
          "404": resolve(__dirname, "404.html")
        },
        output: {
          assetFileNames: (assetInfo) => {
            let extType = assetInfo.name?.split(".").at(1);
            if (extType !== undefined && /svg|ico/i.test(extType)) {
              extType = "img";
            }
            return `${extType}/[name]-[hash][extname]`;
          },
          chunkFileNames: "js/[name]-[hash].js",
          entryFileNames: "js/[name]-[hash].js",
        },
      },
      outDir: "./docs"
    }
  };
});