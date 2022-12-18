function Tabs(parent, tabTexts, click) {
  let that = this;
  this.parent = parent;

  this.create = function () {
    const div = createElementAppendChild("div", that.parent);

    for (const text of tabTexts) {
      createButtonAppendChild(div, text, (e) => click(text));
    }
  };

  this.init = async function () {
    that.create();
  };
  this.init();
}
