const jwt = require("jsonwebtoken");
const { statusCodes, messages } = require("../utils/helper");

/**
 * Authenticate user and token if token is invalid or damaged then it throw error.
 * else pass to the guard. 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const verifyToken = (req, res, next) => {
  try {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== "undefined") {
      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1];

      jwt.verify(bearerToken, process.env.TOKEN_KEY, (err, data) => {
        if (err) {
          return res.json({
            status: statusCodes.UNAUTH,
            message: messages.INVALID_TOKEN,
          });
        } else {
          console.log(data);
          req.user = data;
          next();
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = verifyToken;
