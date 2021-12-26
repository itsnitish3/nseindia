const axios = require("axios");
const httpMethod = async (method, url, body, headers) => {
  try {
    const response = await axios[method](url, body, headers);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
module.exports = httpMethod;
