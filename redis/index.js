const { createClient } = require("redis");
require("dotenv").config();

const client = createClient({
  password: process.env.REDIS_PWD,
  socket: {
    host: "redis-11764.c299.asia-northeast1-1.gce.cloud.redislabs.com",
    port: 11764,
  },
});

client.on("ready", () => {
  console.log("redis is connected");
});

client.on("error", (err) => {
  console.log("redis is disconnected: ", err);
});

(async () => {
  try {
    await client.connect();
    console.log("Redis Connected");
  } catch (error) {
    console.error("error while connecting redis", error);
  }
})();

module.exports = client;
