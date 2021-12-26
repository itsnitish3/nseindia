const express = require("express");
const app = express();
app.set("view engine", "ejs");
const controllers = require("./controllers");
const service = require("./services");
app.get("/getdata", controllers.getdata);

app.get("/print", async (req, res) => {
  let data = await service.getdata();

  res.render("index", {
    data: data,
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
