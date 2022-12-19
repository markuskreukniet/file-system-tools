function TabContent(parent) {
  let that = this;
  this.parent = parent;

  this.create = function () {
    that.div = createElementAppendChild("div", parent);
    that.display("none");
  };

  this.init = async function () {
    that.create();
  };
  this.init();

  this.appendElement = function (element) {
    that.div.appendChild(element);
  };

  this.display = function (display) {
    that.div.style = `display: ${display}`;
  };

  return this;
}
