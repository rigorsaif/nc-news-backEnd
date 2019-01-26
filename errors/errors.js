const logger = require("../utils/logger");
exports.handle400s = (err, req, res, next) => {
  if (err.name === "ValidationError" || err.name === "CastError") {
    logger.error(err.msg);
    res.status(400).send({ msg: err.message });
  } else next(err);
};

exports.handle404s = (err, req, res, next) => {
  if (err.status === 404) {
    logger.error(err.msg || "Page not found");
    res.status(404).send({ msg: err.msg } || "Page not found");
  } else next(err);
};

exports.handle500s = (err, req, res, next) => {
  console.log("handle this error", err);
  logger.error("internal server error");
  res.status(500).send("internal server error");
};
// 400 bad requests

// 404 page is not found

// 500 internal error
