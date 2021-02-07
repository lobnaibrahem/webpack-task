//file path
const path = require("path");
//clean non used imgs/files
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
//html plugin
const html = require("html-webpack-plugin");
//terser plugin
const terser = require("terser-webpack-plugin");

//css plugin
const css = require("mini-css-extract-plugin");
const cssMin = require("css-minimizer-webpack-plugin");

// images plugin
const minImg = require("image-minimizer-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, "./src/index.js"),
  output: {
    filename: "script.all.js",
    path: path.resolve(__dirname, "./bulit/js"),
  },
  mode: "development",
  module: {
    rules: [
      { test: /\.css$/i, use: [css.loader, "css-loader"] },
      { test: /\.s[ac]ss$/i, use: [css.loader, "css-loader", "sass-loader"] },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "images/",
            },
          },
          {
            loader: minImg.loader,
            options: {
              minimizerOptions: {
                plugins: [
                  "gifsicle",
                  ["mozjpeg", { quality: 50 }],
                  "svgo",
                  "optipng",
                ],
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new html({ title: "output", filename: "index.html", inject: "body" }),
    new CleanWebpackPlugin(),
    new css(),
  ],
  optimization: {
    minimize: true,
    minimizer: [`...`,
      new terser({
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
      new cssMin(),
    ],
  },
};
