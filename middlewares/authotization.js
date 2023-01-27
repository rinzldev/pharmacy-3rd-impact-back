const jwt = require("jsonwebtoken");
const responses = require('../middlewares/responses')

const config = process.env;

const verifyToken = (req, res, next) => {
  const token =
    req.headers["x-access-token"]
  if (!token) {
    responses.makeResponsesForbidden(res, "A token is required for authentication")
  }
  try {
    jwt.verify(token, config.SECRET_KEY)
  } catch (err) {
    responses.makeResponsesUnauthorized(res, "Invalid Token")
  }
  return next()
}

module.exports = verifyToken;