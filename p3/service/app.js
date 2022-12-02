import { connect, Application, ServerSentEvent } from "./deps.js";

const conns = new Set();

const connection = await connect({ hostname: "mq" });
const channel = await connection.openChannel();

const queueName = "messager";
await channel.declareQueue({ queue: queueName });
await channel.consume(
  { queue: queueName },
  async (args, props, data) => {
    const JSONdata = JSON.parse(new TextDecoder().decode(data));
    const event = new ServerSentEvent("ping", JSONdata);
    conns.forEach((conn) => {
      conn.dispatchEvent(event);
    })
    console.log("Sending to", conns.size, "connections");
    await channel.ack({ deliveryTag: args.deliveryTag });
  },
);

const app = new Application();
app.use((ctx) => {
  const headers = new Headers([["X-Accel-Buffering", "no"]]);
  const target = ctx.sendEvents({ headers });
  target.addEventListener("close", () => {
    conns.delete(target);
  });
  conns.add(target);
});
await app.listen({ port: 7776 });
