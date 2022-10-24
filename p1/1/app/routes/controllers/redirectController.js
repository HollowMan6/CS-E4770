import * as shortenService from "../../services/shortenService.js";

const redirect = async ({ response, params }) => {
  const tag = params.tag
  const res = await shortenService.redirect(tag)
  if (res.length > 0) {
    response.redirect(res[0].url)
  } else {
    response.body = "Not found"
  }
}

const redirectRandom = async ({ response }) => {
  const res = await shortenService.redirectRandom()
  if (res.length > 0) {
    response.redirect(res[0].url)
  } else {
    response.body = "Empty database"
  }
}

export {
  redirect,
  redirectRandom
};
