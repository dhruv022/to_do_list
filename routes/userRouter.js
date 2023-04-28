//initializing Router
const router = require("express").Router();
//importing validations
const validations = require("../validations/index");
//importing userControllers
const userControllers = require("../controller/usersController");
const validationMiddleware = require("../middleware/validation.middleware");
const tokenMiddleware = require("../middleware/auth");
// const { createGuard } = require('../middleware/guard');

/**
 *
 * 1st argument as path
 * 2nd argument in middlewares
 * 3rd controller which handles the request/response
 */
router.post("/login", userControllers.loginUser);
router.post(
  "/",
  [
    validations.userValidations.createUser,
    validationMiddleware.handleValidations,
  ],
  userControllers.createUser
);
router.get(
  "/:id",
  [
    validations.userValidations.getUserById,
    tokenMiddleware,
    validationMiddleware.handleValidations,
  ],
  userControllers.getUser
);
router.get("/", userControllers.getAllUsers);
router.put(
  "/:id",
  [
    validations.userValidations.updateUser,
    tokenMiddleware,
    validationMiddleware.handleValidations,
  ],
  userControllers.updateUser
);
router.delete(
  "/:id",
  [
    validations.userValidations.getUserById,
    tokenMiddleware,
    validationMiddleware.handleValidations,
  ],
  userControllers.deleteUser
);

module.exports = router;


// users.js


