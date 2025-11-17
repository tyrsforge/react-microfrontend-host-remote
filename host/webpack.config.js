const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { container } = require("webpack");

const { ModuleFederationPlugin } = container;

const deps = require("../package.json").dependencies;

module.exports = {
  context: path.resolve(__dirname),

  entry: "./src/index.js",

  mode: "development",

  output: {
    publicPath: "http://localhost:3000/",
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.[contenthash].js",
    clean: true,
  },

  devServer: {
    port: 3000,
    historyApiFallback: true,
    hot: true,
    open: true,
  },

  resolve: {
    extensions: [".js", ".jsx"],
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "host",

      remotes: {
        remote: "remote@http://localhost:3001/remoteEntry.js",
      },

      shared: {
        react: {
          singleton: true,
          eager: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true,
          eager: true,
          requiredVersion: deps["react-dom"],
        },
        "react-router-dom": {
          singleton: true,
          eager: true,
          requiredVersion: deps["react-router-dom"],
        },
      },
    }),

    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
