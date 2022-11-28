import { serve, serveFile } from "./deps.js";

const handleRequest = async (request) => {
  return await serveFile(request, "static/index.html");
};

serve(handleRequest, { port: 7778 });
