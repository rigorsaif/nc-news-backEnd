const app = require("express")();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const apiRouter = require("./router/mainRouter");
const { DB_URL} = require("./config/config");

console.log(DB_URL);
mongoose.connect(DB_URL).then(() => {
  console.log(`connected to database ${DB_URL}`);
});
app.use(bodyParser.json());
app.use("/api", apiRouter);

app.use("/*", (req, res, next) => {
  next({ err: 404 });
});

app.use((err, req, res, next) => {
  console.log(err, "this is server Error");
});

module.exports = app;
