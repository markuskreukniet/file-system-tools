const https = require("https");

module.exports = {
  getH1InnerHTML: async function (urlsString) {
    const delimiter = "https://";
    const urlParts = urlsString.split(delimiter);
    urlParts.shift();

    let result = "";

    for (const part of urlParts) {
      const html = await getHttpsData(`${delimiter}${part}`);
      const tags = findHtmlTags(html, "h1");
      if (tags?.length === 1) {
        // https://css-tricks.com/snippets/javascript/strip-html-tags-in-javascript/
        const innerHtml = tags[0].replace(/(<([^>]+)>)/gi, "");

        result += `"${innerHtml}" by`;
      } else {
        result += `(${part.split("/")[0]})`;
      }
    }
    return result;
  },
};

function findHtmlTags(html, tag) {
  // TODO: check https://regex101.com/. It gives now an error
  const regex = new RegExp(`<${tag}[^>]*>(.*?)<\\/${tag}>`, "gi");
  return html.match(regex);
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
