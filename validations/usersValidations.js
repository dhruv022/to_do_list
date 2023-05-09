//importing body, params from express-validator
const { body, param } = require("express-validator");
//declaring validations for routes in id (user_id) is required from params.
const getUserById = [
  param("id")
    .escape()
    .notEmpty()
    .withMessage("id is required")
    .isInt()
    .withMessage("id should be an integer"),
];

//declaring required validations for createUser api
const createUser = [
  body("firstName")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("firstName is required")
    .isLength({ min: 3, max: 15 })
    .withMessage("firstName should be in between 3 to 15 characters long"),
  body("email")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("Please enter a valid email"),
  body("phoneNumber")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("mobileNumber is required")
    .isMobilePhone()
    .isLength({ min: 10, max: 10 })
    .withMessage("Please add a valid mobileNumber"),
  body("password")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("password is required")
    .isLength({
      min: 8,
      max: 16,
    })
    .withMessage(
      "Password should be of min 8 characters long and max 16 characters long"
    ),
];

//declaring required validations for updateUser api
const updateUser = [
  body("firstName")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("firstName is required")
    .isLength({ min: 3, max: 15 })
    .withMessage("firstName should be in between 3 to 15 characters long"),
  body("email")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("Please enter a valid email"),
  body("phoneNumber")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("mobileNumber is required")
    .isMobilePhone()
    .withMessage("Please enter a valid mobileNumber")
    .isLength({ min: 10, max: 10 })
    .withMessage("Phone number length must  of 10 dgits"),
  body("password")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Password cannot be empty")
    .isLength({
      min: 8,
      max: 16,
    })
    .withMessage(
      "Password should be of min 8 characters long and max 16 characters long"
    ),
];

module.exports = {
  getUserById,
  createUser,
  updateUser,
};
