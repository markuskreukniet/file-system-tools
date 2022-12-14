"use strict";

function createElementAppendChild(element, parent) {
  const result = document.createElement(element);
  parent.appendChild(result);

  return result;
}

function App(parent) {
  let that = this;
  this.parent = parent;

  this.create = function () {
    const folderInput = createElementAppendChild("input", that.parent);
    folderInput.type = "file";
    folderInput.setAttribute("webkitdirectory", "");

    const fileInput = createElementAppendChild("input", that.parent);
    fileInput.type = "file";

    const p = createElementAppendChild("p", that.parent);

    window.codeQuality.onDetermineNumberOfFileLines((e, numberOfLines) => {
      p.innerHTML = `numberOfLines: ${numberOfLines}`;
    });

    window.codeQuality.sendDetermineNumberOfFileLines([
      "C:/development/file-system-tools/src",
    ]);
  };

  this.init = async function () {
    that.create();
  };
  this.init();
}

const appElement = document.querySelector("#app");
new App(appElement);
