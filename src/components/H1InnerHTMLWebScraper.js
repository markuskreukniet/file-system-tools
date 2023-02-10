function H1InnerHTMLWebScraper(parent) {
  let that = this;
  this.parent = parent;

  this.create = function () {
    // TODO: duplicate
    const textarea = createElementAppendChild("textarea", that.parent);
    textarea.rows = "8";
    textarea.cols = "55";

    that.loader = new Loader(this.parent);

    async function getH1InnerHTML(urlsString) {
      that.loader.display("block");
      textarea.innerHTML = await window.webScraper.getH1InnerHTML(urlsString);
      that.loader.display("none");
    }

    getH1InnerHTML("https://gptzero.me/");
  };

  this.init = async function () {
    that.create();
  };
  this.init();
}
