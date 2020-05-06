exports.handlePSQLErrors = (err, req, res, next) => {
  const codes = { 42703: { status: 400, msg: "Bad Request" } };

  //if the psql error code is in the codes object
  if (err.code in codes) {
    const { status, msg } = codes[err.code];
    res.status(status).send({ msg });
    // have to deconstruct msg to make into msg object as otherwise just a string of the message and res.body expects a msg object.
  } else next(err);
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

exports.handle405s = (req, res) => {
  res.status(405).send({ msg: "Method not allowed" });
};

exports.handleInternalErrors = (err, req, res, next) => {
  console.log("unhandled error:", err);
  res.status(500).send({ msg: "Internal server error" });
};
