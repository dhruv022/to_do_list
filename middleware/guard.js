const jwt = require("jsonwebtoken");
const { statusCodes, messages } = require("../utils/helper");
const userService = require("../services/usersServices");

// function createGuard(allowedRoles) {
//   return function  (req, res, next) {
//     try {
// const bearerHeader = req.headers["authorization"];
// if (typeof bearerHeader !== "undefined") {
//   const bearer = bearerHeader.split(" ");
//   const bearerToken = bearer[1];
//   req.token = bearerToken;
//   const user = jwt.verify(bearerToken, process.env.TOKEN_KEY);
//   console.log(user);
//   // Check if user is authenticated
//   if (!user.user_id) {
// return res.json({
//   status: statusCodes.UNAUTH,
//   message: messages.UNAUTH,
// });
//   }

//       const user = await userService.getUser(req.params).catch((error) => {
//         throw error;
//       });
//         // Check if user has an allowed role
//         if (!allowedRoles.includes(user.user_role_id)) {
//           return res.json({
//             status: statusCodes.FORBIDDEN,
//             message: messages.FORBIDDEN,
//           });
//         }
//         // If user is authenticated and has an allowed role, proceed to the next middleware
//         next();
//       // }
//     } catch (error) {
//       return res.json({
//         status: statusCodes.UNAUTH,
//         message: messages.INVALID_TOKEN,
//       });
//     }
//   };
// }

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
