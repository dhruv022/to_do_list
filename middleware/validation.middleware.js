const { validationResult, body } = require("express-validator");
const validationErrors = require("../validations/index");

const handleValidations = (req, res, next) => {
  try {
    const errors = validationErrors.getRequestErrors(req);
    if (!errors.isEmpty()) {
      return res.send(errors.array());
    }
    next();
  } catch (err) {}
};

module.exports = { handleValidations };
