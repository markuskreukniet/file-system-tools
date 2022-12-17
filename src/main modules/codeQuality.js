const fs = require("fs");

module.exports = {
  determineLinesOfCode: function (paths) {
    let result = 0;
    const stack = [...paths];

    while (stack.length > 0) {
      const path = stack.pop();
      if (pathIsDirectory(path)) {
        stack.push(...getDirectoryPaths(path));
      } else {
        result += numberOfFileLinesWithoutCommentsAndEmptyLines(path);
      }
    }

    return result;
  },
};

function getDirectoryPaths(path) {
  const names = fs.readdirSync(path);

  return names.map((name) => `${path}/${name}`);
}

function pathIsDirectory(path) {
  return fs.lstatSync(path).isDirectory();
}

function numberOfFileLinesWithoutCommentsAndEmptyLines(path) {
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
