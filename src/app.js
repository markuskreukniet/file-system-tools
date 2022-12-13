"use strict";

function App(parent) {
  let that = this;
  this.parent = parent;

  // this.render = function () {
  //   that.parent.innerHTML = `yes yes ${countLines(
  //     "C:/development/file-system-tools/src/app.js"
  //   )}`;
  // };
  // this.init = async function () {
  //   that.render();
  // };
  // this.init();

  window.fileSystem.onDetermineNumberOfFileLines((e, numberOfLines) => {
    console.log("numberOfLines", numberOfLines);
  });
  window.fileSystem.sendDetermineNumberOfFileLines([
    "C:/development/file-system-tools/src",
  ]);
}

const appElement = document.querySelector("#app");
new App(appElement);
