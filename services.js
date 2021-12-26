const redis = require("./redis");
const httpMethod = require("./httpMethod");

let getdata = async () => {
  let data = await redis.getKey("key");
  if (data) {
    return JSON.parse(data);
  } else {
    const url =
      "https://www.nseindia.com/api/live-analysis-variations?index=gainers";
    let headers = {
        Cookie:
          "ak_bmsc=FDB339D949B19707C7A97DD92B6026ED~000000000000000000000000000000~YAAQZNcLF/YGvrV9AQAAAi589Q6wv7dCV1AvwEO0eu3iwmbiIrI3tocOK2bQUVgoYhZAETHSrGFqa2k2rRondjBcIpOhpr/g8yCcQt3hee8W5qVMHlWK5KlJLwObcWiU+NK2C4CkWa+rfGD5nQl4pSdklnp6TowgyEGNe60EXIyZ4vq0O83DMBkLIO9hWZseZ5mfG/BQMCeJKugDW9p5jk2s1mqu2n+MWdphEKPlDHNbMv9XrPO66Fxf6WITKAZvSYuOcTc5VNQa9hp2GjzU/tNejAOUz+X7txq1ADfVgCFHC2HGyaTkurVDCxuByUmL2NpOGD78YKxdToOgWG+/9QoBWGBV3ajVt+20WL+Txfr8FF1rPRGo0tPxJ1N7sOE=; bm_sv=62C60A42586567C5AA1753F122D5639B~G7671j1xVkucFOZu10I+KU7g2uI6HypjraRmdhnPVQjrgAXQOM7w5JWRBs3UZd8rAfdtowWB36My/0wbOP6y9LgDRBC/wb+Ej+YYvwAHU8NUYN2rbXUxUmljrjefm7gCd5rwky0LWOcXKD/8vvY05Cfw8kq3nReehQ7QCg1PpK4=",
      },
      body = {};
    let response = await httpMethod("get", url, body, headers);

    let result = response["NIFTY"]["data"];
    let key = "key";
    let value = JSON.stringify(result);
    let ttl = 5 * 60 * 1000;
    let redisData = await redis.setKey(key, value, ttl);
    console.log(redisData);
    return result;
  }
};
module.exports = { getdata };
