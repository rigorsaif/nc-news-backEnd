const app = require("express")();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const apiRouter = require("./router/apiRouter");
const { handle400s, handle404s, handle500s } = require("./errors/errors");
const { DB_URL } =
  process.env.NODE_ENV === "production"
    ? process.env
    : require("./config/config");

mongoose.connect(DB_URL).then(() => {
  console.log(`connected to database ${DB_URL}`);
});
app.get("/", (req, res, next) => {
  res.sendFile(`${__dirname}/views/index.html`);
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );
  // allow preflight
  if (req.method === "OPTIONS") {
    res.send(200);
  } else {
    next();
  }
});
app.use(bodyParser.json());
app.use("/api", apiRouter);

app.use("/*", (req, res, next) => {
  next({ status: 404, msg: "not found" });
});

app.use(handle400s);
app.use(handle404s);
app.use(handle500s);

module.exports = app;
