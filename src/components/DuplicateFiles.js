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

    window.duplicateFiles.onDetermineDuplicateFiles((e, duplicateFiles) => {
      p.innerHTML = `Duplicate files:<br/>${duplicateFiles}`;
    });

    function sendDetermineDuplicateFiles(filePaths) {
      window.duplicateFiles.sendDetermineDuplicateFiles(filePaths);
    }
  };

  this.init = async function () {
    that.create();
  };
  this.init();
}
