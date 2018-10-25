const app = require("express")();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const apiRouter = require("./router/mainRouter");
const { handle400s, handle404s, handle500s } = require("./errors/errors");
const { DB_URL } = require("./config/config");

mongoose.connect(DB_URL).then(() => {
  console.log(`connected to database ${DB_URL}`);
});
app.use(bodyParser.json());
app.use("/api", apiRouter);

app.use("/*", (req, res, next) => {
  next({ status: 404, msg: "not found"});
});

app.use(handle400s);
app.use(handle404s);
app.use(handle500s);

module.exports = app;
