"use strict";

function createElementAppendChild(element, parent) {
  const result = document.createElement(element);
  parent.appendChild(result);

  return result;
}

function createButtonAppendChild(parent, innerHTML, onclick) {
  const button = createElementAppendChild("button", parent);
  button.type = "button";
  button.innerHTML = innerHTML;
  button.onclick = onclick;
}

// TODO: add char count, not only lines
function App(parent) {
  let that = this;
  this.parent = parent;

  this.create = function () {
    that.filePaths = [];

    function handleChange(files) {
      const file = files[0];
      const folderPath = file.path.replace(`\\${file.name}`, "");

      const li = createElementAppendChild("li", ul);
      li.innerHTML = folderPath;

      // files is a FileList, not an array, so we can't use .map
      for (const x of files) {
        that.filePaths.push(x.path);
      }
    }

    new FileOrFolderInput(that.parent, "folder", "folder", (e) =>
      handleChange(e.target.files)
    );

    const ul = createElementAppendChild("ul", that.parent);

    createButtonAppendChild(that.parent, "reset", reset);
    createButtonAppendChild(
      that.parent,
      "submit",
      sendDetermineNumberOfFileLines
    );

    const p = createElementAppendChild("p", that.parent);

    window.codeQuality.onDetermineNumberOfFileLines((e, numberOfLines) => {
      p.innerHTML = `Lines of code: ${numberOfLines}`;
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

//
function FileOrFolderInput(parent, type, id, listener) {
  let that = this;
  this.parent = parent;

  this.create = function () {
    function clickInput() {
      document.getElementById(id).click();
    }

    const input = createElementAppendChild("input", that.parent);
    input.type = "file";
    input.id = id;
    input.addEventListener("change", listener);
    input.style = "display: none;";

    if (type === "folder") {
      input.setAttribute("webkitdirectory", "");
    }

    let text = "choose ";
    switch (type) {
      case "tempo":
        text += "file";

        break;
      case "folder":
        text += "folder";

        break;
    }

    createButtonAppendChild(that.parent, text, clickInput);
  };

  this.init = async function () {
    that.create();
  };
  this.init();
}
