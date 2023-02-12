function H1InnerHTMLWebScraper(parent) {
  let that = this;
  this.parent = parent;

  this.create = function () {
    // TODO: duplicate
    const textarea = createElementAppendChild("textarea", that.parent);
    textarea.rows = "8";
    textarea.cols = "55";

    // TODO: duplicate text
    createButtonAppendChild(that.parent, "submit", getH1InnerHTML);

    that.loader = new Loader(this.parent);

    // TODO textarea.value instead of innerHTML on other places?
    async function getH1InnerHTML() {
      that.loader.display("block");
      const urlsString = textarea.value;
      textarea.value = await window.webScraper.getH1InnerHTML(urlsString);
      that.loader.display("none");
    }
  };

  this.init = async function () {
    that.create();
  };
  this.init();
}
