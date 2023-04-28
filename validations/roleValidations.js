const { body, param } = require("express-validator");

const createRole = [
  body("roleName")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("roleName is required"),
];

const roleById = [
  param("id")
    .escape()
    .notEmpty()
    .withMessage("id is required")
    .isInt()
    .withMessage("id should be an integer"),
];

const enum_user_roles = ["ADMIN", "SUPER_ADMIN", "USER"];

const checkRoleName = [
  body("roleName")
    .isIn(enum_user_roles)
    .withMessage(`Value must be one of ${enum_user_roles.join(",")}`),
];

module.exports = {
  createRole,
  roleById,
  checkRoleName,
};
