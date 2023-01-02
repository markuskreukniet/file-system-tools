const crypto = require("crypto");
const fs = require("fs");

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

    // const filePartSize = Math.round((1024 * 1024 * 1024) / 10); // Math.round((1 GiB) / 10)
    // can be a faster option, but makes hash of a file part
    // function getHashHexOfFirstFilePart(path, filePartSize) {
    //   return new Promise((resolve, reject) => {
    //     const hash = crypto.createHash("sha1"); // SHA1 is faster than MD5
    //     const stream = fs.createReadStream(path, {
    //       highWaterMark: filePartSize,
    //     });
    //     stream.on("error", (err) => reject(err));
    //     stream.on("data", (chunk) => {
    //       resolve(hash.update(chunk).digest("hex"));
    //       stream.destroy();
    //     });
    //   });
    // }

    // path and size combinations of files
    const pathSizeCombinations = [];
    for (const path of paths) {
      const stats = fs.statSync(path);
      // skip zero-byte files
      if (stats.size > 0) {
        pathSizeCombinations.push({ path: path, size: stats.size });
      }
    }

    // sort combinations
    function compare(a, b) {
      if (a.size < b.size) {
        return -1;
      }
      if (a.size > b.size) {
        return 1;
      }
      return 0;
    }
    pathSizeCombinations.sort(compare);

    // duplicates of path and hash combinations
    const duplicates = [];
    let lastPushedIndex = -1;

    for (let i = 1; i < pathSizeCombinations.length; i++) {
      const combination = pathSizeCombinations[i - 1];
      const combination2 = pathSizeCombinations[i];

      if (combination.size === combination2.size) {
        const hashHex = await getHashHex(combination.path);
        const hashHex2 = await getHashHex(combination2.path);

        if (hashHex === hashHex2) {
          if (lastPushedIndex !== i - 1) {
            duplicates.push({ path: combination.path, hash: hashHex });
          }
          duplicates.push({ path: combination2.path, hash: hashHex2 });
          lastPushedIndex = i;
        }
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
