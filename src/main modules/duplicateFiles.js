const crypto = require("crypto");
const fs = require("fs");

// TODO: same files have the same size. Therefore, only hash files with the same size
// TODO: skip files without any size/content?
module.exports = {
  determineDuplicateFiles: async function (paths) {
    // path and content hash combinations of files
    const pathHashCombinations = [];
    for (const path of paths) {
      const contents = fs.readFileSync(path);
      const hash = crypto.createHash("sha1").update(contents).digest("hex"); // SHA1 is faster than MD5
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

    // duplicates of pathHashCombinations
    const duplicates = [];
    let lastPushedIndex = -1;

    for (let i = 1; i < pathHashCombinations.length; i++) {
      if (pathHashCombinations[i - 1].hash === pathHashCombinations[i].hash) {
        if (lastPushedIndex !== i - 1) {
          duplicates.push(pathHashCombinations[i - 1]);
        }
        duplicates.push(pathHashCombinations[i]);

        lastPushedIndex = i;
      }
    }

    // return "" if no duplicates
    if (duplicates.length === 0) {
      return "no duplicates";
    }

    // result
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
