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

// TODO: check for making useless elements
// TODO: duplicate code
// TODO: logical line of code
// TODO: add char count, not only lines
function App(parent) {
  let that = this;
  this.parent = parent;

  this.fetch = async function () {
    const scriptUrls = [
      "./components/CodeQuality.js",
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

    new Tabs(that.parent, tabTexts, clickedTab);

    const codeQualityDiv = createElementAppendChild("div", that.parent);
    new CodeQuality(codeQualityDiv);

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
