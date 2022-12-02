import { serve } from "./deps.js";

const BASE_PATH = "./react/build";

const reqHandler = async (req) => {
  let filePath = BASE_PATH + new URL(req.url).pathname;
  if (new URL(req.url).pathname === "/") {
    filePath += "index.html";
  };
  let fileSize;
  try {
    fileSize = (await Deno.stat(filePath)).size;
  } catch (e) {
    if (e instanceof Deno.errors.NotFound) {
      return new Response(null, { status: 404 });
    }
    return new Response(null, { status: 500 });
  }
  
  const body = (await Deno.open(filePath)).readable;
  return new Response(body, {
    headers: { "content-length": fileSize.toString() },
  });
};


serve(reqHandler, { port: 7778 });
