function Loader(parent) {
  let that = this;
  this.parent = parent;

  this.create = function () {
    that.div = createElementAppendChildWithClassName(
      "div",
      that.parent,
      "loader"
    );
    that.div.innerHTML = "loading";
    that.display("none");
  };
  this.display = function (display) {
    that.div.style = `display: ${display};`;
  };
  this.init = async function () {
    that.create();
  };
  this.init();

  return this;
}
