module.exports = {
  entry: "./project.xml",
  output: {
    filename: "basic.bundle.js",
  },
  module: {
    rules: [
      {
        test: /\/project\.xml$/,
        use: [
          {
            loader: "openfl-loader",
          },
        ],
      },
    ],
  },
};
