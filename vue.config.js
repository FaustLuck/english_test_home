const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  chainWebpack(config) {
    config.optimization
      .minimizer("terser")
      .tap(args => {
        args[0].terserOptions.output = {
          comments: false
        };
        return args;
      });
  },
  transpileDependencies: true,
  productionSourceMap: false,
  outputDir: "docs",
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