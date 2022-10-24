import * as shortenService from "../../services/shortenService.js";

const showMain = async ({ request, render }) => {
  const statData = {
    shortened: "",
    url: "",
  }

  if (request.method === "POST") {
    const body = request.body({ type: "form" });
    const data = await body.value;
    const url = data.get("url");
    statData.url = url;
    const shortened = await shortenService.shortenUrl(url);
    statData.shortened = request.url.href + shortened;
  }

  render("main.eta", statData);
};

export { showMain };
