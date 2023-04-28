const jwt = require("jsonwebtoken");
const { statusCodes, messages } = require("../utils/helper");

const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    try {
      const verified = jwt.verify(bearerToken, process.env.TOKEN_KEY);
      console.log(verified);
    } catch (err) {
      return res.json({
        status: statusCodes.UNAUTH,
        message: messages.INVALID_TOKEN,
      });
    }
    next();
  }
};

module.exports = verifyToken;
