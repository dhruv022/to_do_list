const jwt = require("jsonwebtoken");
const { statusCodes, messages } = require("../utils/helper");
const userService = require("../services/usersServices");

/**
 * Routing Guard for compare roles of which token is inserted with roles in database
 * Throw error if user want to access details and give data when token of Admin or SuperAdmin gets hit
 * @param {*} allowedRoles 
 * @returns 
 */
const roleGuard = (allowedRoles) => {
  return async function (req, res, next) {
    if (!req.user.user_id) {
      // throw erro user not found
      return res.json({
        status: statusCodes.UNAUTH,
        message: messages.UNAUTH,
      });
    }
    console.log(req.user);

    req.user["id"] = req.user.user_id;
    const userDetails = await userService.getUser(req.user).catch((error) => {
      throw error;
    });
    console.log(userDetails, "---- details--");
    if (!allowedRoles.includes(userDetails.data.roleName)) {
      console.log(allowedRoles[0]);
      return res.json({
        status: statusCodes.FORBIDDEN,
        message: messages.FORBIDDEN,
      });
    }
    next();
    // if(allowedRoles == userDetails.)
  };
};
module.exports = { roleGuard };
