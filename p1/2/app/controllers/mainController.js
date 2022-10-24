/** The file is used for generate proper response for the request */
import { renderFile } from "https://deno.land/x/eta@v1.12.3/mod.ts";
import * as shortenService from "../services/shortenService.js";

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const showMain = async (request) => {
  const statData = {
    shortened: "",
    url: "",
  }

  if (request.method === "POST") {
    const data = await request.formData()
    const url = data.get("url");
    statData.url = url;
    const shortened = await shortenService.shortenUrl(url);
    statData.shortened = (new URL(request.url)).origin + "/" + shortened;
  }

  return new Response(await renderFile("main.eta", statData), responseDetails);
};

export { showMain };
