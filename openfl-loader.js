const child_process = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

module.exports = function (source) {
  var cb = this.async();

  const id = this.resourcePath;

  const projectXml = fs.readFileSync(this.resourcePath, { encoding: "utf8" });

  const haxelibs = getHaxelibs(projectXml);
  const usesGenes = haxelibs.includes("genes");

  const isProduction = this.mode === "production";
  const projectDir = path.dirname(id);
  const mode = isProduction ? "-release" : "-debug";
  const templateDir = path.join("templates", usesGenes ? "genes" : "default");
  const result = child_process.spawnSync("haxelib", [
    "run",
    "lime",
    "build",
    id,
    "html5",
    mode,
    `--template=${path.resolve(__dirname, templateDir)}`,
  ]);
  if (result.status !== 0) {
    logger.error(result.output.toString());
    cb(
      new Error(
        "Command `lime build html5` failed with error code: " + result.status
      )
    );
    return;
  }

  const hxml = getHXML(id);
  if (!hxml) {
    cb(new Error("Command `lime display html5` failed."));
    return;
  }
  const jsOutputPath = getJSOutputPath(hxml);
  if (!jsOutputPath) {
    cb(new Error("Failed to detect OpenFL html5 output file path."));
    return;
  }
  let code = fs.readFileSync(path.resolve(projectDir, jsOutputPath), {
    encoding: "utf8",
  });
  if (usesGenes) {
    const jsOutputDir = path.dirname(jsOutputPath);
    code = code.replaceAll(
      /import (.*?) from ('|")./g,
      `import $1 from "./${jsOutputDir}/`
    );
  }
  cb(null, code, null);
};

function getHaxelibs(projectXML) {
  const haxelibRegExp = /<haxelib\s+name=\"(.*?)\".*?\/>/g;
  let haxelibElement = haxelibRegExp.exec(projectXML);
  if (!haxelibElement) {
    return [];
  }
  const haxelibs = [];
  while (haxelibElement) {
    const haxelib = haxelibElement[1];
    haxelibs.push(haxelib);
    haxelibElement = haxelibRegExp.exec(projectXML);
  }
  return haxelibs;
}

function getHXML(id) {
  const result = child_process.spawnSync("haxelib", [
    "run",
    "lime",
    "display",
    id,
    "html5",
  ]);
  if (result.status !== 0) {
    console.error(result.output.toString());
    return null;
  }
  return result.output.toString();
}

function getJSOutputPath(hxml, projectDir) {
  const jsArg = /\-js (.+)/.exec(hxml);
  if (!jsArg) {
    return null;
  }
  return jsArg[1];
}
