import { serve } from "./deps.js";
import { grade } from "./grade.js";

const handleRequest = async (request) => {
  const formData = await request.formData();
  const code = formData.get("code");

  const result = await grade(code);

  return new Response(JSON.stringify({ result: result }));
};

serve(handleRequest, { port: 7777 });
