exports.handle400s = (err, req, res, next) => {
  if (err.name === "ValidationError" || err.name === "CastError") {
    res.status(400).send({ msg: err.message });
  } else next(err);
};

exports.handle404s = (err, req, res, next) => {
  if (err.status === 404)
    res.status(404).send({ msg: err.msg } || "Page not found");
  else next(err);
};

exports.handle500s = (err, req, res, next) => {
  console.log("handle this error", err);
  res.status(500).send("internal server error");
};
// 400 bad requests

// 404 page is not found

// 500 internal error
