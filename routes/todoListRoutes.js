const router = require("express").Router();
const todoListController = require("../controller/todoListController");
const validations = require("../validations/index");
const validationMiddleware = require("../middleware/validation.middleware");
const tokenMiddleware = require("../middleware/auth");
const { roleGuard } = require("../middleware/guard");

/**
 *
 * 1st argument as path
 * 2nd argument in middlewares
 * 3rd controller which handles the request/response
 */
router.post(
  "/",
  [
    validations.todoListDataValidations.createList,
    validations.todoListDataValidations.checkRoleStatus,
    validationMiddleware.handleValidations,
  ],
  todoListController.createList
);
router.get(
  "/:id",
  [
    validations.todoListDataValidations.getTodoList,
    tokenMiddleware,
    validationMiddleware.handleValidations,
  ],
  todoListController.getTodoList
);
router.get(
  "/",
  tokenMiddleware,
  roleGuard(["ADMIN", "SUPER_ADMIN"]),
  todoListController.getAllListData
);
router.put(
  "/:id",
  [
    validations.todoListDataValidations.createList,
    validations.todoListDataValidations.checkRoleStatus,
    validationMiddleware.handleValidations,
  ],
  todoListController.updateTodoListData
);
router.delete(
  "/:id",
  [
    validations.todoListDataValidations.getTodoList,
    validationMiddleware.handleValidations,
  ],
  todoListController.deleteTodoListData
);
module.exports = router;
