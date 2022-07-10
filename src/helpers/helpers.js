module.exports = function verifyToken(req, res, next) {
  const bearerHearder = req.headers["authorization"];
  if (typeof bearerHearder != "undefined") {
    const bearer = bearerHearder.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
};
