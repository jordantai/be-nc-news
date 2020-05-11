exports.handlePSQLErrors = (err, req, res, next) => {
  const badRequestCodes = ["42703", "22P02"];
  const foreignKey404 = ["23503"];
  if (badRequestCodes.includes(err.code)) {
    res.status(400).send({ msg: "Bad request" });
  } else if (foreignKey404.includes(err.code)) {
    res.status(404).send({ msg: "not found" });
  } else {
    next(err);
  }
};

exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
};

exports.send404 = (req, res, next) => {
  res.status(404).send({ msg: "Resource not found" });
};

exports.send405 = (req, res, next) => {
  res.status(405).send({ msg: "Method not allowed" });
};

exports.handleInternalErrors = (err, req, res, next) => {
  console.log("unhandled error:", err);
  res.status(500).send({ msg: "Internal server error" });
};
