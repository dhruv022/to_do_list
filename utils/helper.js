//centralizing messages
const messages = {
  SUCCESS: "Success",
  CREATED: "Created Successfully",
  COMMON_ERROR:
    "Server error occurred while processing your request, Please contact support team",
  BAD_REQUEST: "Invalid inputs supplied",
  NOT_FOUND: "item that you are looking for doesn't found",
  ALREADY_EXIST: "record already exists",
  DELETED_REQUEST: "record deleted successfully",
  LOGIN: "user logged in successfully",
  FOUND: "login successfully",
  UNAUTH: "User not authenticated",
  INVALID_TOKEN: "Invalid token",
  FORBIDDEN:"user not authorized to access this page"

};

//centralizing statusCodes
const statusCodes = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  COMMON_ERROR: 500,
  NOT_FOUND: 404,
  UNAUTH: 401,
};

/**
 * Purpose: common function to createResponse in case of success
 * @param {*} data
 * @param {*} status
 * @param {*} message
 * @returns
 */
const successResponse = (
  data = undefined,
  status = statusCodes.SUCCESS,
  message = messages.SUCCESS
) => {
  return { status, message, data };
};

/**
 * Purpose: common function to createResponse in case of error/failure
 * @param {*} status
 * @param {*} message
 * @param {*} data
 * @returns
 */
const errorResponse = (
  status = statusCodes.COMMON_ERROR,
  message = messages.COMMON_ERROR,
  data = undefined
) => {
  return {
    status,
    message,
    data,
  };
};
/**
 * Purpose: common function to createResponse as apiResponse.
 * @param {*} res
 * @param {*} status
 * @param {*} message
 * @param {*} data
 * @param {*} error
 */
const generateResponse = (
  res,
  status,
  message = messages.SUCCESS,
  data = undefined,
  error = undefined
) => {
  res.status(status).send({ status, message, data, error });
};

module.exports = {
  messages,
  statusCodes,
  successResponse,
  generateResponse,
  errorResponse,
};
