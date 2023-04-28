//importing validationResult from express-validator
const { validationResult } = require("express-validator");
//importing userValidations
const roleValidations = require("./roleValidations");
const userValidations = require("./usersValidations");
const todoListDataValidations = require("./todoListDataValidations");

/**
 * Purpose: formatting the errors in input fields
 * @param {*} param0
 * @returns
 */
const errorFormatter = ({
  location,
  msg,
  path,
  param,
  value,
  nestedErrors,
}) => {
  let err = {};
  err["field"] = path;
  err["message"] = msg;
  return err;
};

/**
 * Purpose: Returns formatted errors in input fields.
 * @param {*} req
 * @returns
 */
const getRequestErrors = (req) => {
  return validationResult(req).formatWith(errorFormatter);
};

module.exports = {
  userValidations,
  getRequestErrors,
  roleValidations,
  todoListDataValidations,
};
