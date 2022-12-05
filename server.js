const express = require("express");

const db = require("./config/conn");
const routes = require("./routes");

const PORT = 3001;
const app = express();
const {urlencoded, json} = express;
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(routes);

db.once("open", () =>
  app.listen(PORT, () => console.log(`Running at port: ${PORT}!`))
);
// testing