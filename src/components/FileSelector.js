function FileSelector(parent, id, click) {
  let that = this;
  this.parent = parent;

  this.create = function () {
    that.filePaths = [];

    function handleChange(files) {
      const file = files[0];
      const folderPath = file.path.replace(`\\${file.name}`, ""); // TODO: does not always give the expected result

      const li = createElementAppendChild("li", ul);
      li.innerHTML = folderPath;

      // files is a FileList, not an array, so we can't use .map
      for (const x of files) {
        that.filePaths.push(x.path);
      }
    }

    new FileOrFolderInput(that.parent, "folder", id, (e) =>
      handleChange(e.target.files)
    );

    const ul = createElementAppendChild("ul", that.parent);

    createButtonAppendChild(that.parent, "reset", reset);
    createButtonAppendChild(that.parent, "submit", (e) =>
      click(that.filePaths)
    );

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
