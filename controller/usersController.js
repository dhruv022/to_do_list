const { Result } = require("express-validator");
const userService = require("../services/usersServices");
const { generateResponse, statusCodes, messages } = require("../utils/helper");
const { getRequestErrors } = require("../validations/index");

/**
 * Purpose: Function which handles the requests for login user details by email
 * @param {*} req
 * @param {*} res
 * @returns
 */
const loginUser = async (req, res) => {
  try {
    const user = await userService.loginUser(req.body).catch((error) => {
      throw error;
    });
    res.status(user.statusCode).json({
      status: user.statusCode,
      message: user.message,
      token: user.token,
      id: user.id,
    });
  } catch (error) {
    res.send(error);
  }
};

/**
 * Purpose: Function which handles the request for create user
 * @param {*} req
 * @param {*} res
 * @returns
 */
const createUser = async (req, res) => {
  const errors = getRequestErrors(req);
  if (!errors.isEmpty()) {
    return generateResponse(res, statusCodes.BAD_REQUEST, messages.BAD_REQUEST);
  }
  const result = await userService.createUser(req.body);
  console.log(result.message);
  return generateResponse(res, statusCodes.SUCCESS, result.message);
};

/**
 * Purpose: Function which handles the requests for getting user details by id
 * @param {*} req
 * @param {*} res
 * @returns
 */
const getUser = async (req, res) => {
  try {
    const user = await userService.getUser(req.params).catch((error) => {
      throw error;
    });
    res.status(user.statusCode).json({
      status: user.statusCode,
      message: user.message,
      data: user.data,
    });
    // res.send('response')
  } catch (error) {
    res.send(error);
  }
};

/**
 * Purpose: Function which handles the requests for getting all details from users
 * @param {*} req
 * @param {*} res
 * @returns
 */
const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers().catch((error) => {
      throw error;
    });
    res.status(users.statusCode).json({
      status: users.statusCode,
      message: users.message,
      data: users.data,
    });
    // res.send('response')
  } catch (error) {
    res.send(error);
  }
};

/**
 * Purpose: Function which handles the requests for update data from users
 * @param {*} req
 * @param {*} res
 * @returns
 */
const updateUser = async (req, res) => {
  try {
    const user = await userService
      .updateUser(req.params, req.body, res)
      .catch((error) => {
        throw error;
      });
    res.status(user.statusCode).json({
      status: user.statusCode,
      message: user.message,
      data: user.data,
    });
    // res.send('response')
  } catch (error) {
    res.send(error);
  }
};

/**
 * Purpose: Function which handles the requests for deleteUser from users
 * @param {*} req
 * @param {*} res
 * @returns
 */
const deleteUser = async (req, res) => {
  try {
    const user = await userService.deleteUser(req.params).catch((error) => {
      throw error;
    });
    res.status(user.statusCode).json({
      status: user.statusCode,
      message: user.message,
      data: user.data,
    });
    // res.send('response')
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  createUser,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
  loginUser,
};
