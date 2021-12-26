"use strict";
const redis = require("redis");
const util = require("util");
const client = redis.createClient();
const getAsync = util.promisify(client.get).bind(client);

client.on("connect", function () {
  console.log("Redis client connected");
});

client.on("error", function () {
  console.log("Error connecting redis");
});

const redisFunctions = {
  setKey: async function (key, value, ttl) {
    console.log("called");
    try {
      //   await client.setKey(key, value, ttl);
      //   await client.expire(key, ttl);
      await client.setex(key, ttl, value);

      return 1;
    } catch (e) {
      console.log(e);
      return 0;
    }
  },

  getKey: async function (key) {
    let data;

    try {
      data = await getAsync(key);
    } catch (e) {
      console.log(e);
    }
    return data;
  },
  deleteKey: async function (key) {
    let data;
    try {
      data = await client.del(key);
    } catch (e) {
      console.log(e);
    }
    return data;
  },
};

module.exports = redisFunctions;
