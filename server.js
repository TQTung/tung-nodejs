const express = require("express");
const app = express();
const port = 8080;

app.get("/", (req, res) => {
  res.send("Hello World Im running Nodejs!");
});
app.get("/about", (req, res) => {
  res.send("I'm running");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port} ...`);
});
