const logger = require("../utils/logger");
exports.handle400s = (err, req, res, next) => {
  if (err.name === "ValidationError" || err.name === "CastError") {
    logger.error(`url:${req.url}, errStatus:400, ${err.msg}`);
    res.status(400).send({ msg: err.message });
  } else next(err);
};

exports.handle404s = (err, req, res, next) => {
  if (err.status === 404) {
    logger.error(
      `url:${req.url}, errStatus:404, ${err.msg || "Page not found"}`
    );
    res.status(404).send({ msg: err.msg } || "Page not found");
  } else next(err);
};

exports.handle500s = (err, req, res, next) => {
  console.log("handle this error", err);
  logger.error(
    `url:${req.url}, errStatus:500, ${err.msg || "internal server error"}`
  );
  res.status(500).send("internal server error");
};
// 400 bad requests

// 404 page is not found

// 500 internal error
