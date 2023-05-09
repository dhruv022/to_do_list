const connection = require("../config/db.config");
const { statusCodes, messages } = require("../utils/helper");
const tokenValue = require("../middleware/guard");
/**
 * Purpose: Function to create a todoList.
 * @param {*} params
 * @returns
 */
const createList = async (body) => {
  try {
    await connection.raw(
      `INSERT INTO to_do_list_data (userId, title, description, status ) VALUES ("${body.userId}","${body.title}","${body.description}","${body.status}")`
    );
    return {
      statusCode: statusCodes.SUCCESS,
      message: messages.CREATED,
    };
  } catch (error) {
    throw error;
  }
};

/**
 * Purpose: Function to get a todoList by Id.
 * @param {*} params
 * @returns
 */
const getTodoList = async (params) => {
  try {
    const checkExistingData = await connection.raw(
      `SELECT * FROM to_do_list_data WHERE userId = ?`,
      [params.id]
    );
    if (checkExistingData[0].length) {
      return {
        statusCode: statusCodes.SUCCESS,
        message: messages.SUCCESS,
        data: checkExistingData[0],
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
 * Purpose: Function for get all data of todoList.
 * @param {*} params
 * @returns
 */
const getAllListData = async (params) => {
  try {
    const allListData = await connection.raw(`SELECT * FROM to_do_list_data`);
    if (allListData[0].length) {
      return {
        statusCode: statusCodes.SUCCESS,
        message: messages.SUCCESS,
        data: allListData[0],
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
 * Purpose: Function for update data of todoList.
 * @param {*} params
 * @returns
 */
const updateTodoListData = async (params, body) => {
  try {
    const checkExistingData = await connection.raw(
      `SELECT * FROM to_do_list_data WHERE id=?`,
      [params.id]
    );
    if (checkExistingData[0].length) {
      await connection.raw(
        `UPDATE to_do_list_data SET title= "${body.title}", description = "${body.description}" , status = "${body.status}"where id ="${params.id}"`
      );
      return {
        statusCode: statusCodes.SUCCESS,
        message: messages.SUCCESS,
        data: {
          title: body.title,
          description: body.description,
          status: body.status,
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
 * Purpose: Function for delete data of todoList.
 * @param {*} params
 * @returns
 */
const deleteTodoListData = async (params) => {
  try {
    const checkExistingData = await connection.raw(
      `SELECT * FROM to_do_list_data WHERE id=?`,
      [params.id]
    );
    if (checkExistingData[0].length) {
      await connection.raw(
        `DELETE FROM to_do_list_data WHERE id="${params.id}"`
      );
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
  createList,
  getTodoList,
  getAllListData,
  updateTodoListData,
  deleteTodoListData,
};
