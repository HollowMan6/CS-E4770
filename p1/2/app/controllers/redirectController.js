import * as shortenService from "../services/shortenService.js";
import * as requestUtils from "../utils/requestUtils.js";

const redirect = async (request) => {
  const url = new URL(request.url)
  const urlParts = url.pathname.split("/")
  const tag = urlParts[1]
  const res = await shortenService.redirect(tag)
  if (res.length > 0) {
    return requestUtils.redirectTo(res[0].url)
  } else {
    return new Response("Not found", { status: 404 });
  }
}

const redirectRandom = async () => {
  const res = await shortenService.redirectRandom()
  if (res.length > 0) {
    return requestUtils.redirectTo(res[0].url)
  } else {
    return new Response("Empty database", { status: 404 });
  }
}

export {
  redirect,
  redirectRandom
};
