const crypto = require("crypto");
const fs = require("fs");

module.exports = {
  determineDuplicateFiles: function (paths) {
    const pathHashCombinations = [];
    for (const path of paths) {
      const contents = fs.readFileSync(path);
      const hash = crypto.createHash("md5").update(contents).digest("hex");
      pathHashCombinations.push({ path: path, hash: hash });
    }

    const duplicates = [];

    for (const combination of pathHashCombinations) {
      if (
        pathHashCombinations.filter((x) => x.path === combination.path).length >
        1 // TODO: maybe use any or something like that
      ) {
        duplicates.push(combination);
      }
    }

    if (duplicates.length === 0) {
      return "";
    }

    function compare(a, b) {
      if (a.hash < b.hash) {
        return -1;
      }
      if (a.hash > b.hash) {
        return 1;
      }
      return 0;
    }

    duplicates.sort(compare);

    let result = duplicates[0].path;
    for (let i = 1; i < duplicates.length; i++) {
      if (duplicates[i].path === duplicates[i - 1].path) {
        result += `\n${duplicates[i].path}`;
      } else {
        result += `\n\n${duplicates[i].path}`;
      }
    }

    return result;
  },
};
