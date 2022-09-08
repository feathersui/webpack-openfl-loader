# OpenFL Loader for Webpack

A custom loader to build [OpenFL](https://openfl.org) (and [Feathers UI](https://feathersui.com/)) projects with [Webpack](https://webpack.js.org).

## Usage

Create a new directory for your project.

Create the necessary files for an OpenFL project, including _project.xml_ and _.hx_ source files inside the project's root directory. Then, follow the remaining steps to setup Webpack and openfl-loader.

In a terminal, run the following command in the root of your project to create a _package.json_ file:

```sh
npm init -y
```

Then, run the following command to install the required dependencies:

```sh
npm install --save-dev webpack-cli webpack-dev-server openfl-loader
```

Open the _package.json_ file, and modify the `scripts` section:

```json
"scripts": {
  "start": "webpack serve --mode=development",
  "build": "webpack --mode=production"
}
```

Create a _webpack.config.js_ file in the root of your project:

```js
module.exports = {
  entry: "./project.xml",
  output: {
    // change xyz to an appropriate name for your project
    filename: "xyz.bundle.js",
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
```

Create a _public/index.html_ file. Look inside _samples/basic_ sample for an example that's easy to copy with minor modifications.

In particular, you need to change the _basic.bundle.js_ path to the same output file name used in _webpack.config.js_:

```html
<!--
  This bundle file name is defined in webpack.config.js
-->
<script src="./basic.bundle.js"></script>
```

And you need to change the `lime.embed()` call to pass the same app file name used in _project.xml_.

```js
/*
  the first argument passed to lime.embed() is the
  <app file="******"/> value from project.xml
*/
lime.embed("WebpackBasicSample", "openfl-content", 0, 0, {
  parameters: {},
});
```

To start a local development server, run the following command. Then, open _http://localhost:8080/_ in a web browser.

```sh
npm start
```

To build a production JavaScript bundle, run the following command:

```sh
npm run build
```
