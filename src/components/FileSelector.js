function FileSelector(parent, id, click) {
  let that = this;
  this.parent = parent;

  this.create = function () {
    that.filePaths = [];

    function handleChange(files) {
      function getFolderPath(file) {
        return file.path.replace(`\\${file.name}`, "");
      }

      const folderPath = getFolderPath(files[0]);
      const folderPath2 = getFolderPath(files[files.length - 1]);

      let prefix = "";
      for (let i = 0; i < folderPath.length; i++) {
        if (folderPath[i] === folderPath2[i]) {
          prefix += folderPath[i];
        } else {
          break;
        }
      }

      const li = createElementAppendChild("li", ul);
      li.innerHTML = prefix;

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
