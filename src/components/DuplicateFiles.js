function DuplicateFiles(parent) {
  let that = this;
  this.parent = parent;

  this.create = function () {
    new FileSelector(
      that.parent,
      "DuplicateFilesFileSelector",
      getDuplicateFiles
    );

    const p = createElementAppendChild("p", that.parent);
    p.innerHTML = "Duplicate files:";

    const textarea = createElementAppendChild("textarea", that.parent);
    textarea.rows = "8";
    textarea.cols = "55";

    that.loader = new Loader(this.parent);

    async function getDuplicateFiles(filePaths) {
      that.loader.display("block");
      textarea.innerHTML = await window.duplicateFiles.getDuplicateFiles(
        filePaths
      );
      that.loader.display("none");
    }
  };

  this.init = async function () {
    that.create();
  };
  this.init();
}
