import { Pool } from "../deps.js";

const CONCURRENT_CONNECTIONS = 2;

let connectionPool;
if (Deno.env.get("PG_CLUSTER_RW_SERVICE_HOST")) {
  connectionPool = new Pool({
    hostname: Deno.env.get("PG_CLUSTER_RW_SERVICE_HOST"),
    port: Deno.env.get("PG_CLUSTER_RW_SERVICE_PORT"),
  }, CONCURRENT_CONNECTIONS);
} else {
  connectionPool = new Pool({}, CONCURRENT_CONNECTIONS);
}

const executeQuery = async (query, params) => {
  const response = {};
  let client;

  try {
    client = await connectionPool.connect();
    const result = await client.queryObject(query, params);
    if (result.rows) {
      response.rows = result.rows;
    }
  } catch (e) {
    console.log(e);
    response.error = e;
  } finally {
    if (client) {
      try {
        await client.release();
      } catch (e) {
        console.log("Unable to release database connection.");
        console.log(e);
      }
    }
  }

  return response;
};

export { executeQuery };
