import express from "express";
import configViewEngine from "./configs/viewengine";

const app = express();
const port = 8080;

configViewEngine(app);

app.get("/", (req, res) => {
  res.render("index.ejs");
});
app.get("/about", (req, res) => {
  res.send("I'm running");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port} ...`);
});
