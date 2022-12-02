import { serve, connect } from "./deps.js";
import { getMessages, getReplies, updatePoints, addMessage, addReply } from "./services/messageService.js";

const connection = await connect({ hostname: "mq" });
const channel = await connection.openChannel();
const queueName = "messager";

BigInt.prototype.toJSON = function () { return this.toString() }

const handleRequest = async (request) => {
  if (request.method === "GET") {
    let result;
    const url = new URL(request.url);
    let id = 2147483646;
    if (url.searchParams.get('id')) {
      id = url.searchParams.get('id');
    }
    if (url.searchParams.get('messageid')) {
      result = await getReplies(id, url.searchParams.get('messageid'));
    } else {
      result = await getMessages(id);
    }
    return new Response(JSON.stringify(result));
  } else if (request.method === "POST") {
    const formData = await request.json();
    const id = formData.id;
    const vote = formData.vote;
    const msg = formData.msg;
    const usertoken = formData.usertoken;
    const content = formData.content;
    const messageid = formData.messageid;
    let result = {};
    if (id && vote && msg) {
      result = await updatePoints(id, vote, msg);
    } else if (usertoken && content && !messageid) {
      result = await addMessage(usertoken, content);
    } else if (usertoken && content && messageid) {
      result = await addReply(usertoken, content, messageid);
    }
    if (result) {
      await channel.publish(
        { routingKey: queueName },
        { contentType: "application/json" },
        new TextEncoder().encode(JSON.stringify(result))
      );
    }
    return new Response(JSON.stringify(result));
  }
};

serve(handleRequest, { port: 7777 });
