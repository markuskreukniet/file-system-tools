function FileOrFolderInput(parent, type, id, listener) {
  let that = this;
  this.parent = parent;

  this.create = function () {
    onClick = (e) => {
      e.target.value = "";
    };

    function clickInput() {
      document.getElementById(id).click();
    }

    const input = createElementAppendChild("input", that.parent);
    input.type = "file";
    input.id = id;
    input.addEventListener("change", listener);
    input.onclick = onClick; // needed for making selecting the same file or folder after each other possible
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
  };

  this.init = async function () {
    that.create();
  };
  this.init();
}
