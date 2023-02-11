const https = require("https");

module.exports = {
  getH1InnerHTML: async function (urlsString) {
    const html = await getHttpsData(urlsString);
    const tags = findHtmlTags(html, "h1");
    if (tags.length === 1) {
      // https://css-tricks.com/snippets/javascript/strip-html-tags-in-javascript/
      const innerHtml = tags[0].replace(/(<([^>]+)>)/gi, "");

      return `"${innerHtml}" by`;
    } else {
      return "";
    }
  },
};

// TODO: check
function findHtmlTags(html, tag) {
  const regex = new RegExp(`<${tag}[^>]*>(.*?)<\\/${tag}>`, "gi");
  const tags = [];
  let match;

  while ((match = regex.exec(html)) !== null) {
    tags.push(match[0]);
  }

  return tags;
}

function getHttpsData(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (resp) => {
        let data = "";

        resp.on("data", (chunk) => {
          data += chunk;
        });

        resp.on("end", () => {
          resolve(data);
        });
      })
      .on("error", (err) => {
        console.log("Error: " + err.message);
        reject();
      });
  });
}
