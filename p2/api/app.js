import { serve, connect } from "./deps.js";
import { getQuestionsStatus, recordSubmission, getSubmission } from "./services/exerciseService.js";

// Handling submission peaks consisting of thousands of code submissions within a
// minute by storing submissions into a queue that is processed whenever resources are
// available.
const connection = await connect({ hostname: "mq" });
const channel = await connection.openChannel();
const queueName = "grader";

// Features a cache of exercise submissions and the corresponding grading results.
// The cache is used to avoid unnecessary grading of submissions that match
// submitted codes already present in the cache
let cache = {};

const handleRequest = async (request) => {
  if (request.method === "GET") {
    const url = new URL(request.url);
    if (url.searchParams.get('id')) {
      const result = await getSubmission(url.searchParams.get('id'));
      return new Response(JSON.stringify({ result }));
    }
    const result = await getQuestionsStatus(url.searchParams.get('user'));
    return new Response(JSON.stringify(result));
  } else if (request.method === "POST") {
    const formData = await request.formData();
    const code = formData.get("code");
    const user = formData.get("user");
    const exercise = Number(formData.get("exercise"));
    let result;
    if (!(exercise in cache)) {
      cache[exercise] = {};
    }

    if (code in cache[exercise]) {
      result = cache[exercise][code];
    } else {
      result = await recordSubmission(user, exercise, code);
      cache[exercise][code] = result;
      const ans = await getSubmission(result);
      if (!ans) {
        await channel.publish(
          { routingKey: queueName },
          { contentType: "application/json" },
          new TextEncoder().encode(JSON.stringify({ code, result }))
        );
      }
    }
    return new Response(JSON.stringify({ result, exercise }));
  }
};

serve(handleRequest, { port: 7777 });
