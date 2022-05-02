const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: 'docs',
  publicPath:
    process.env.NODE_ENV === "production" ? "/english_test_home/" : "/",
  pages: {
    index: {
      entry: "src/main.js",
      template: "public/index.html",
      filename: "index.html",
    },
    "404": {
      entry: "src/main.js",
      template: "public/404.html",
      filename: "404.html"
    }
  }
});