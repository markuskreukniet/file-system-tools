const crypto = require("crypto");
const fs = require("fs");

module.exports = {
  determineDuplicateFiles: function (paths) {
    // path and content hash combinations of files
    const pathHashCombinations = [];
    for (const path of paths) {
      const contents = fs.readFileSync(path);
      const hash = crypto.createHash("md5").update(contents).digest("hex");
      pathHashCombinations.push({ path: path, hash: hash });
    }

    // sort combinations
    function compare(a, b) {
      if (a.hash < b.hash) {
        return -1;
      }
      if (a.hash > b.hash) {
        return 1;
      }
      return 0;
    }
    pathHashCombinations.sort(compare);

    //

    const duplicates = [];

    for (const combination of pathHashCombinations) {
      if (
        pathHashCombinations.filter((x) => x.hash === combination.hash).length >
        1
      ) {
        duplicates.push(combination);
      }
    }

    if (duplicates.length === 0) {
      return "";
    }

    let result = duplicates[0].path;
    for (let i = 1; i < duplicates.length; i++) {
      let resultPart = `\n${duplicates[i].path}`;

      if (duplicates[i].hash !== duplicates[i - 1].hash) {
        resultPart = `\n${resultPart}`;
      }

      result += resultPart;
    }

    return result;
  },
};
