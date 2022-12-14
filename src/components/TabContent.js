function TabContent(parent, element) {
  let that = this;
  this.parent = parent;

  this.display = function (display) {
    that.element.style = `display: ${display}`;
  };

  this.create = function () {
    that.element = that.parent.appendChild(element);
    that.display("none");
    that.element.className = "margin-top-1";
  };

  this.init = async function () {
    that.create();
  };
  this.init();

  return this;
}
