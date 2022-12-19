"use strict";

function includeScriptInHead(src) {
  return new Promise((resolve, reject) => {
    const script = createElementAppendChild("script", document.head);

    script.setAttribute("src", src);
    script.addEventListener("load", resolve);
    script.addEventListener("error", reject);
  });
}

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

// TODO: duplicate code
// TODO: logical line of code
// TODO: add char count, not only lines
function App(parent) {
  let that = this;
  this.parent = parent;

  this.fetch = async function () {
    const scriptUrls = [
      "./components/FileOrFolderInput.js",
      "./components/TabContent.js",
      "./components/Tabs.js",
    ];

    try {
      const promises = scriptUrls.map((x) => {
        return includeScriptInHead(x);
      });

      await Promise.all(promises);
    } catch (e) {
      console.log(e);
    }
  };

  this.create = function () {
    const tabTexts = ["Duplicate Files", "Code Quality"];

    function clickedTab(text) {
      console.log("text", text);
      //
    }

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

    new Tabs(that.parent, tabTexts, clickedTab);

    const codeQualityDiv = createElementAppendChild("div", that.parent);

    new FileOrFolderInput(codeQualityDiv, "folder", "folder", (e) =>
      handleChange(e.target.files)
    );

    const ul = createElementAppendChild("ul", codeQualityDiv);

    createButtonAppendChild(codeQualityDiv, "reset", reset);
    createButtonAppendChild(
      codeQualityDiv,
      "submit",
      sendDetermineNumberOfFileLines
    );

    const p = createElementAppendChild("p", codeQualityDiv);

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

    const tabContent = new TabContent(that.parent, codeQualityDiv);
    tabContent.display("block");
  };

  this.init = async function () {
    await that.fetch();
    that.create();
  };
  this.init();
}

const appElement = document.querySelector("#app");
new App(appElement);
