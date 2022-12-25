function CodeQuality(parent) {
  let that = this;
  this.parent = parent;

  this.create = function () {
    new FileSelector(
      that.parent,
      "CodeQualityFileSelector",
      sendDetermineLinesOfCode
    );

    const p = createElementAppendChild("p", that.parent);

    that.loader = new Loader(this.parent);

    window.codeQuality.onDetermineLinesOfCode((e, linesOfCode) => {
      p.innerHTML = `Lines of code: ${linesOfCode}`;
      that.loader.display("none");
    });

    function sendDetermineLinesOfCode(filePaths) {
      that.loader.display("block");
      window.codeQuality.sendDetermineLinesOfCode(filePaths);
    }
  };

  this.init = async function () {
    that.create();
  };
  this.init();
}
