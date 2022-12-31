const crypto = require("crypto");
const fs = require("fs");

// TODO: same files have the same size. Therefore, only hash files with the same size
module.exports = {
  determineDuplicateFiles: async function (paths) {
    function getHashHex(path) {
      return new Promise((resolve, reject) => {
        const hash = crypto.createHash("sha1"); // SHA1 is faster than MD5
        const stream = fs.createReadStream(path);
        stream.on("error", (err) => reject(err));
        stream.on("data", (chunk) => hash.update(chunk));
        stream.on("end", () => resolve(hash.digest("hex")));
      });
    }

    // path and content hash combinations of files
    const pathHashCombinations = [];
    for (const path of paths) {
      const stats = fs.statSync(path);
      // skip zero-byte files
      if (stats.size > 0) {
        const hashHex = await getHashHex(path);
        pathHashCombinations.push({ path: path, hash: hashHex });
      }
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
