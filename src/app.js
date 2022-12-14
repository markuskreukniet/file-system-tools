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
    that.filePaths = [];

    const folderInput = createElementAppendChild("input", that.parent);
    folderInput.type = "file";
    folderInput.setAttribute("webkitdirectory", "");

    // const fileInput = createElementAppendChild("input", that.parent);
    // fileInput.type = "file";

    const ul = createElementAppendChild("ul", that.parent);

    folderInput.addEventListener("change", (e) => {
      const files = e.target.files; // It is a FileList, not an array, so we can't use .map

      const file = files[0];
      const folderPath = file.path.replace(`\\${file.name}`, "");

      const li = createElementAppendChild("li", ul);
      li.innerHTML = folderPath;

      for (const x of files) {
        that.filePaths.push(x.path);
      }

      folderInput.value = "";
    });

    const submitButton = createElementAppendChild("button", that.parent);
    submitButton.type = "button";
    submitButton.innerHTML = "submit";
    submitButton.onclick = sendDetermineNumberOfFileLines;

    const resetButton = createElementAppendChild("button", that.parent);
    resetButton.type = "button";
    resetButton.innerHTML = "reset";
    resetButton.onclick = reset;

    const p = createElementAppendChild("p", that.parent);

    window.codeQuality.onDetermineNumberOfFileLines((e, numberOfLines) => {
      p.innerHTML = `numberOfLines: ${numberOfLines}`;
    });

    function sendDetermineNumberOfFileLines() {
      window.codeQuality.sendDetermineNumberOfFileLines(that.filePaths);
    }

    function reset() {
      ul.innerHTML = "";
      that.filePaths = [];
    }
  };

  this.init = async function () {
    that.create();
  };
  this.init();
}

const appElement = document.querySelector("#app");
new App(appElement);
