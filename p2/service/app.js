import { grade } from "./grade.js";
import { updateSubmission } from "./services/exerciseService.js";
import { connect } from "./deps.js";

const connection = await connect({ hostname: "mq" });
const channel = await connection.openChannel();

const queueName = "grader";
await channel.declareQueue({ queue: queueName });
await channel.qos({ prefetchCount: 200 });
await channel.consume(
  { queue: queueName },
  async(args, props, data) => {
    const JSONdata = JSON.parse(new TextDecoder().decode(data));
    console.log("Received message", JSONdata);
    const result = await grade(JSONdata.code);
    await updateSubmission(result, JSONdata.result);
    await channel.ack({ deliveryTag: args.deliveryTag });
  },
);
