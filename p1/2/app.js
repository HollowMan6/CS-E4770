/** The server is created and the requests is dipathed in the file*/
import { serve } from "https://deno.land/std@0.140.0/http/server.ts";
import { configure } from "https://deno.land/x/eta@v1.12.3/mod.ts";
import * as mainController from "./controllers/mainController.js"
import * as redirectController from "./controllers/redirectController.js"

/** Configure the path to find the Eta files */
configure({
    views: `${Deno.cwd()}/views/`,
});

const handleRequest = async (request) => {
    const url = new URL(request.url)

    if (url.pathname === "/" && request.method === "GET") {
        return await mainController.showMain(request)
    } else if (url.pathname === "/" && request.method === "POST") {
        return await mainController.showMain(request)
    } else if (url.pathname === "/random" && request.method === "GET") {
        return await redirectController.redirectRandom()
    } else if (url.pathname.match("/[a-zA-Z0-9_-]+") && request.method === "GET") {
        return await redirectController.redirect(request)
    } else {
        return new Response("Not found", { status: 404 });
    }
}

let port = 7777;
if (Deno.args.length > 0) {
    const lastArgument = Deno.args[Deno.args.length - 1];
    port = Number(lastArgument);
}

serve(handleRequest, { port });
