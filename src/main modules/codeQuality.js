const fs = require("fs");

module.exports = {
  determineNumberOfFileLines: function (paths) {
    let result = 0;
    const stack = [...paths];

    while (stack.length > 0) {
      const path = stack.pop();
      if (pathIsDirectory(path)) {
        stack.push(...getDirectoryPaths(path));
      } else {
        result += countCodeLines(path);
      }
    }

    return result;
  },
};

function getDirectoryPaths(path) {
  const result = [];
  const names = fs.readdirSync(path);

  // TODO: should be a map
  for (const name of names) {
    result.push(`${path}/${name}`);
  }

  return result;
}

function pathIsDirectory(path) {
  return fs.lstatSync(path).isDirectory();
}

function countCodeLines(path) {
  let code = fs.readFileSync(path, { encoding: "utf8" });
  code = removeCommentsAndEmptyLines(code);
  const lines = code.split("\n");

  return lines.length;
}

function removeCommentsAndEmptyLines(code) {
  code = code.replace(
    /\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$|<!--(.|\s)*?-->/gm,
    ""
  ); // removes JavaScript, HTML, and CSS comments

  let lines = code.split("\n");
  lines = lines.filter((line) => line.trim() !== "");

  return lines.join("\n");
}
