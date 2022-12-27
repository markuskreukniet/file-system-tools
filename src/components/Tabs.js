function Tabs(parent, tabTexts, click) {
  let that = this;
  this.parent = parent;

  this.create = function () {
    const activeClassName = "active";

    function changeActiveTabAndClick(text) {
      that.activeTab.className = "";

      that.activeTab = document.getElementById(text);
      that.activeTab.className = activeClassName;

      click(text);
    }

    const tabs = createElementAppendChildWithClassName(
      "div",
      that.parent,
      "tabs"
    );

    for (const text of tabTexts) {
      const tab = createButtonAppendChild(tabs, text, (e) =>
        changeActiveTabAndClick(text)
      );
      tab.id = text;
    }

    that.activeTab = document.getElementById(tabTexts[0]);
    that.activeTab.className = activeClassName;
  };

  this.init = async function () {
    that.create();
  };
  this.init();
}
