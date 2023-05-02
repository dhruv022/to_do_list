const jwt = require("jsonwebtoken");
const { statusCodes, messages } = require("../utils/helper");

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

// const verifyToken = (req, res, next) => {
//   try {
//     const bearerHeader = req.headers["authorization"];
//     if (typeof bearerHeader !== "undefined") {
//       const bearer = bearerHeader.split(" ");
//       const bearerToken = bearer[1];
//       req.token = bearerToken;
//       try {
//         const user = jwt.verify(bearerToken, process.env.TOKEN_KEY);
//         console.log(user);
//         req.user = user;
//       } catch (err) {
//         return res.json({
//           status: statusCodes.UNAUTH,
//           message: messages.INVALID_TOKEN,
//         });
//       }
//       next();
//     }

//     // const verifyToken = (req, res, next) => {
//     //   try {
//     // let user = {}
//     // console.log('--- middleware ---')
//     // user['user_id'] = 4
//     // req.user = user
//     // next()
//     // const bearerHeader = req.headers['authorization'];
//     // if (typeof bearerHeader !== 'undefined') {
//     //     const bearer = bearerHeader.split(' ');
//     //     const bearerToken = bearer[1];
//     //     jwt.verify(bearerToken, process.env.TOKEN_KEY, (error, payload) => {
//     //         if(error) {
//     //             res.json({ error: error
//     //             })
//     //         }else {
//     //             req['user']['user_id'] = payload.user_id
//     //             next()
//     //         }
//     //     });
//     //     console.log(token)
//     // }
//   } catch (err) {
//     console.log(err);
//     return res.json({
//       status: statusCodes.UNAUTHORIZED,
//       message: messages.INVALID,
//     });
//   }
// };

// module.exports = verifyToken;
