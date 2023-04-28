const { body, param } = require("express-validator");

const createList = [
  body("title").trim().escape().notEmpty().withMessage("Title is required"),
];

const getTodoList = [
  param("id")
    .escape()
    .notEmpty()
    .withMessage("Id is required")
    .isInt()
    .withMessage("Id should be an integer"),
];

const roleStatus = ["INCOMPLETE", "COMPLETE"];
const checkRoleStatus = [
  body("status")
    .isIn(roleStatus)
    .withMessage(`Value must be one of ${roleStatus.join(",")}`),
];

module.exports = {
  createList,
  getTodoList,
  checkRoleStatus,
};
