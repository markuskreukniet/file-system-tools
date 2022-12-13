"use strict";

function App(parent) {
  let that = this;
  this.parent = parent;

  this.create = function () {
    window.fileSystem.onDetermineNumberOfFileLines((e, numberOfLines) => {
      that.parent.innerHTML = `yes yes ${numberOfLines}`;
    });

    window.fileSystem.sendDetermineNumberOfFileLines([
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
