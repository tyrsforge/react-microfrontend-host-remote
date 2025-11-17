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
    publicPath: "http://localhost:3001/",
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.[contenthash].js",
    clean: true,
  },

  devServer: {
    port: 3001,
    historyApiFallback: true,
    hot: true,
    open: false,
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
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      // Remote name in the Module Federation ecosystem (used by
      // other apps to reference this container)
      name: "remote",

      // File that exposes this container's modules (consumed as
      // remoteEntry.js by the host)
      filename: "remoteEntry.js",

      // Modules that the host will be able to import.
      // This will allow us to do `import("remote/RemoteApp")`
      exposes: {
        "./RemoteApp": "./src/RemoteApp",
      },

      // Shared dependencies (ensure a single React instance across
      // host and remotes)
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
      },
    }),

    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
