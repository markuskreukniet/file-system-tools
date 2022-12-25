function FileOrFolderInput(parent, type, id, listener) {
  let that = this;
  this.parent = parent;

  // TODO: id becomes id + type
  this.create = function () {
    onClick = (e) => {
      that.loader.display("block");
      e.target.value = "";
    };

    function displayNoneAndListener(filePaths) {
      that.loader.display("none");
      listener(filePaths);
    }

    function clickInput() {
      document.getElementById(id).click();
    }

    const input = createElementAppendChild("input", that.parent);
    input.type = "file";
    input.id = id;
    input.addEventListener("change", displayNoneAndListener);
    input.onclick = onClick; // makes selecting the same file or folder possible
    input.style = "display: none;";

    if (type === "folder") {
      input.setAttribute("webkitdirectory", "");
    }

    let text = "choose ";
    switch (type) {
      case "tempo":
        text += "file";

        break;
      case "folder":
        text += "folder";

        break;
    }

    createButtonAppendChild(that.parent, text, clickInput);

    that.loader = new Loader(this.parent);
  };

  this.init = async function () {
    that.create();
  };
  this.init();
}
