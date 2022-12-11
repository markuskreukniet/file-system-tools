"use strict";

const fs = require("fs");

function App(parent) {
  let that = this;
  this.parent = parent;

  this.render = function () {
    function countLines(filePath) {
      const content = fs.readFileSync(filePath, "utf8");
      const lines = content.split("\n");

      return lines.length;
    }

    that.parent.innerHTML = `yes yes ${countLines(
      "C:/development/file-system-tools/src/app.js"
    )}`;
  };
  this.init = async function () {
    that.render();
  };
  this.init();
}

const appElement = document.querySelector("#app");
new App(appElement);
