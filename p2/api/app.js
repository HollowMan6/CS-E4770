import { serve, sleep } from "./deps.js";
import { grade } from "./grade.js";
import { getQuestionsStatus, recordSubmission } from "./services/exerciseService.js";

// Features a cache of exercise submissions and the corresponding grading results.
// The cache is used to avoid unnecessary grading of submissions that match
// submitted codes already present in the cache
let cache = {};

// Handling submission peaks consisting of thousands of code submissions within a
// minute by storing submissions into a queue that is processed whenever resources are
// available.
let queue = 0;

const handleRequest = async (request) => {
  if (request.method === "GET") {
    const url = new URL(request.url);
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
      // As one grader can last 12 seconds, we can limit the number of concurrent
      // graders to 200 to handle submission peaks consisting of thousands of code
      // submissions within a minute.
      while (queue > 200) {
        await sleep(1);
      }
      queue++;
      result = await grade(code);
      queue--;
      cache[exercise][code] = result;
      recordSubmission(user, exercise, code, result);
    }
    return new Response(JSON.stringify({ result: result }));
  }
};

serve(handleRequest, { port: 7777 });
