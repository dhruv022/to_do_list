const router = require("express").Router();
const userRolesController = require("../controller/userRolesController");
const validations = require("../validations/index");
const validationMiddleware = require("../middleware/validation.middleware");

/**
 * 1st argument as path
 * 2nd argument in middlewares
 * 3rd controller which handles the request/response
 */
router.post(
  "/",
  [
    validations.roleValidations.createRole,
    validations.roleValidations.checkRoleName,
    validationMiddleware.handleValidations,
  ],
  userRolesController.createRole
);
router.get(
  "/:id",
  [
    validations.roleValidations.roleById,
    validationMiddleware.handleValidations,
  ],
  userRolesController.getRole
);
router.get("/", userRolesController.getAllRole);
router.put(
  "/:id",
  [
    validations.roleValidations.createRole,
    validations.roleValidations.checkRoleName,
    validationMiddleware.handleValidations,
  ],
  userRolesController.updateRole
);
router.delete(
  "/:id",
  [
    validations.roleValidations.roleById,
    validationMiddleware.handleValidations,
  ],
  userRolesController.deleteRole
);

module.exports = router;
