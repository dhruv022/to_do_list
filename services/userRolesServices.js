const connection = require("../config/db.config");

const { statusCodes, messages } = require("../utils/helper");

/**
 * Purpose: Function to create a user_roles .
 * @param {*} params
 * @returns
 */
const createRole = async (body) => {
  try {
    const checkExistingRole = await connection.raw(
      `SELECT * FROM user_roles WHERE roleName= ?`,
      [body.roleName]
    );
    console.log(checkExistingRole[0], "--- user ---");
    if (checkExistingRole[0].length) {
      throw {
        statusCode: statusCodes.BAD_REQUEST,
        message: messages.ALREADY_EXIST,
      };
    }
    await connection.raw(
      `INSERT INTO user_roles (roleName) VALUES ("${body.roleName}")`
    );
    return {
      statusCode: statusCodes.SUCCESS,
      message: messages.CREATED,
      data: {
        roleName: body.roleName,
      },
    };
  } catch (error) {
    throw error;
  }
};

/**
 * Purpose: Function for get roles by id.
 * @param {*} params
 * @returns
 */
const getRole = async (params) => {
  try {
    const checkExistingRole = await connection.raw(
      `SELECT * FROM user_roles WHERE id=?`,
      [params.id]
    );
    console.log(checkExistingRole[0], "--- user ---");
    if (checkExistingRole[0].length) {
      return {
        statusCode: statusCodes.SUCCESS,
        message: messages.SUCCESS,
        data: {
          id: checkExistingRole[0][0].id,
          roleName: checkExistingRole[0][0].roleName,
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

/**
 * Purpose: Function for get all roles.
 * @param {*} params
 * @returns
 */
const getAllRole = async (params) => {
  try {
    const allRoles = await connection.raw(`SELECT * FROM user_roles`);
    console.log(allRoles[0], "--- roles ---");
    if (allRoles[0].length) {
      return {
        statusCode: statusCodes.SUCCESS,
        message: messages.SUCCESS,
        data: allRoles[0],
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
 * Purpose: Function for update data of roles.
 * @param {*} params
 * @returns
 */
const updateRole = async (params, body) => {
  try {
    const checkExistingRole = await connection.raw(
      `SELECT * FROM user_roles WHERE id=?`,
      [params.id]
    );
    console.log(checkExistingRole[0], "--- role ---");
    if (checkExistingRole[0].length) {
      await connection.raw(
        `UPDATE user_roles SET roleName= "${body.roleName}" where id ="${params.id}"`
      );
      return {
        statusCode: statusCodes.SUCCESS,
        message: messages.SUCCESS,
        data: {
          roleName: body.roleName,
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

/**
 * Purpose: Function for delete data of roles.
 * @param {*} params
 * @returns
 */
const deleteRole = async (params) => {
  try {
    const checkExistingRole = await connection.raw(
      `SELECT * FROM user_roles WHERE id=?`,
      [params.id]
    );
    console.log(checkExistingRole[0], "--- role ---");
    if (checkExistingRole[0].length) {
      await connection.raw(`DELETE FROM user_roles WHERE id="${params.id}"`);
      return {
        statusCode: statusCodes.SUCCESS,
        message: messages.DELETED_REQUEST,
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

module.exports = {
  createRole,
  getRole,
  getAllRole,
  updateRole,
  deleteRole,
};
