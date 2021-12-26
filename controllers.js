let service = require("./services");
let getdata = async (req, res) => {
  let data = await service.getdata();
  if (data) res.send(data);
};

module.exports = { getdata };
