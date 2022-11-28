import { serve } from "./deps.js";

const handleRequest = async (request) => {
  const data = {
    hello: 'world'
  };

  return new Response(JSON.stringify(data));
};

serve(handleRequest, { port: 7777 });
