module.exports = {
  entry: "./project.xml",
  output: {
    filename: "genes.bundle.js",
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
