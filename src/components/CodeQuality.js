function CodeQuality(parent) {
  let that = this;
  this.parent = parent;

  this.create = function () {
    new FileSelector(that.parent, sendDetermineLinesOfCode);

    const p = createElementAppendChild("p", that.parent);

    window.codeQuality.onDetermineLinesOfCode((e, numberOfLines) => {
      p.innerHTML = `Lines of code: ${numberOfLines}`;
    });

    function sendDetermineLinesOfCode(filePaths) {
      window.codeQuality.sendDetermineLinesOfCode(filePaths);
    }
  };

  this.init = async function () {
    that.create();
  };
  this.init();
}
