function DuplicateFiles(parent) {
  let that = this;
  this.parent = parent;

  this.create = function () {
    new FileSelector(
      that.parent,
      "DuplicateFilesFileSelector",
      sendDetermineDuplicateFiles
    );

    const p = createElementAppendChild("p", that.parent);
    p.innerHTML = "Duplicate files:";

    const textarea = createElementAppendChild("textarea", that.parent);
    textarea.rows = "8";
    textarea.cols = "55";

    that.loader = new Loader(this.parent);

    window.duplicateFiles.onDetermineDuplicateFiles((e, duplicateFiles) => {
      textarea.innerHTML = duplicateFiles;
      that.loader.display("none");
    });

    function sendDetermineDuplicateFiles(filePaths) {
      that.loader.display("block");
      window.duplicateFiles.sendDetermineDuplicateFiles(filePaths);
    }
  };

  this.init = async function () {
    that.create();
  };
  this.init();
}
