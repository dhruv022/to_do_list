const connection = require("../config/db.config");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");
const {
  errorResponse,
  statusCodes,
  messages,
  successResponse,
} = require("../utils/helper");

/***
 *
 * Purpose: Function for login user by email.
 * @param {*} params
 * @returns
 */
const loginUser = async (body) => {
  try {
    const checkExistingUser = await connection.raw(
      `SELECT * FROM users WHERE email= ?`,
      [body.email]
    );
    if (checkExistingUser[0].length) {
      const salt = checkExistingUser[0][0].saltValue;
      const hashPassword = await bcrypt.hash(body.password, salt);
      if (hashPassword == checkExistingUser[0][0].password) {
        const token = jwt.sign(
          { user_id: checkExistingUser[0][0].id},
          process.env.TOKEN_KEY,
        );
        return {
          statusCode: statusCodes.SUCCESS,
          message: messages.FOUND,
          token:token,
          id: checkExistingUser[0][0].id
        };
      }
    }
    return {
      statusCode: statusCodes.UNAUTH,
      message: messages.UNAUTH,
    };
  } catch (error) {
    throw error;
  }
};

/***
 *
 * Purpose: Function to create a user .
 * @param {*} params
 * @returns
 */
const createUser = async (body) => {
  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashPassword = await bcrypt.hash(body.password, salt);
    const checkExistingUser = await connection.raw(
      `SELECT * FROM users WHERE email= ?`,
      [body.email]
    );
    if (checkExistingUser[0].length) {
      return errorResponse(statusCodes.BAD_REQUEST, messages.ALREADY_EXIST);
    }
    if (body.hasOwnProperty("status")) {
      await connection.raw(
        `INSERT INTO users (firstName, lastName, email, password, phoneNumber, saltValue, status, roleId) VALUES("${body.firstName}","${body.lastName}","${body.email}","${hashPassword}","${body.phoneNumber}","${salt}","${body.status}","${body.roleId}")`,
      );
      return successResponse(statusCodes.SUCCESS, messages.CREATED);
    } else {
      await connection.raw(
        `INSERT INTO users (firstName, lastName, email, password, phoneNumber, saltValue,roleId) VALUES("${body.firstName}","${body.lastName}","${body.email}","${hashPassword}","${body.phoneNumber}","${salt}","${body.roleId}")`
      );
      return successResponse(statusCodes.SUCCESS, messages.CREATED);
    }
     } catch (error) {
    return errorResponse(statusCodes.BAD_REQUEST, messages.ALREADY_EXIST);
  }
};

/***
 *
 * Purpose: Function for get get user by id.
 * @param {*} params
 * @returns
 */
const getUser = async (params) => {
  console.log(params,'-- params --')
  try {
    const checkExistingUser = await connection.raw(
      `SELECT * FROM users JOIN user_roles ON users.roleId = user_roles.id WHERE users.id=?`,
      [params.id]
    );
    if (checkExistingUser[0].length) {
      return {
        statusCode: statusCodes.SUCCESS,
        message: messages.SUCCESS,
        data: {
          id: checkExistingUser[0][0].id,
          firstName: checkExistingUser[0][0].firstName,
          lastName: checkExistingUser[0][0].lastName,
          email: checkExistingUser[0][0].email,
          password: checkExistingUser[0][0].password,
          phoneNumber: checkExistingUser[0][0].phoneNumber,
          status: checkExistingUser[0][0].status,
          roleName: checkExistingUser[0][0].roleName
        },
      };
    } else {
      throw {
        statusCodes: statusCodes.NOT_FOUND,
        messages: messages.NOT_FOUND,
      };
    }
  } catch (error) {
    throw error;
  }
};

/***
 *
 * Purpose: Function for get all users.
 * @param {*} params
 * @returns
 */
const getAllUsers = async (params) => {
  try {
    const allUsers = await connection.raw(`SELECT * FROM users`);
    if (allUsers[0].length) {
      return {
        statusCode: statusCodes.SUCCESS,
        message: messages.SUCCESS,
        data: allUsers[0],
      };
    } else {
      throw {
        statusCodes: statusCodes.NOT_FOUND,
        messages: messages.NOT_FOUND,
      };
    }
  } catch (error) {
    throw error;
  }
};

/***
 *
 * Purpose: Function for update data of users.
 * @param {*} params
 * @returns
 */
const updateUser = async (params, body) => {
  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashPassword = await bcrypt.hash(body.password, salt);
    // const hashPassword = await bcrypt.hash(body.password, 10);
    const checkExistingUser = await connection.raw(
      `SELECT * FROM users WHERE id=?`,
      [params.id]
    );
    if (checkExistingUser[0].length) {
      if (body.hasOwnProperty("status")) {
        await connection.raw(
          `UPDATE users SET firstName= "${body.firstName}", lastName="${body.lastName}", password="${hashPassword}", saltValue="${salt}", phoneNumber="${body.phoneNumber}", status="${body.status}", roleId="${body.roleId}" WHERE id="${params.id}"`
        );
      } else {
        await connection.raw(
          `UPDATE users SET firstName= "${body.firstName}", lastName="${body.lastName}", password="${hashPassword}", saltValue="${salt}", phoneNumber="${body.phoneNumber}",roleId="${body.roleId}" WHERE id="${params.id}"`
        );
      }
      return {
        statusCode: statusCodes.SUCCESS,
        message: messages.UPDATED,
        data: {
          firstName: body.firstName,
          lastName: body.lastName,
          password: body.password,
          phoneNumber: body.phoneNumber,
          status: body.status,
          roleId : body.roleId
        },
      };
    } else {
      throw {
        statusCode: statusCodes.NOT_FOUND,
        message: messages.NOT_FOUND,
      };
    }
  } catch (error) {
    throw error;
  }
};

/***
 *
 * Purpose: Function for delete data of users.
 * @param {*} params
 * @returns
 */
const deleteUser = async (params) => {
  try {
    const checkExistingUser = await connection.raw(
      `SELECT * FROM users WHERE id=?`,
      [params.id]
    );
    if (checkExistingUser[0].length) {
      await connection.raw(`DELETE FROM users WHERE id="${params.id}"`);
      return {
        statusCode: statusCodes.SUCCESS,
        message: messages.DELETED_REQUEST,
      };
    } else {
      throw {
        statusCodes: statusCodes.NOT_FOUND,
        messages: messages.NOT_FOUND,
      };
    }
  } catch (error) {
    throw error;
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


