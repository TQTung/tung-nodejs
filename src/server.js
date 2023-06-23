import express from "express";
import configViewEngine from "./configs/viewengine";
import initWebRoute from "./route/web";
import initApiRoute from "./route/api";
require("dotenv").config();

const app = express();
const port = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// set up view engine
configViewEngine(app);

// init web route
initWebRoute(app);

// init api route
initApiRoute(app);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port} ...`);
});
