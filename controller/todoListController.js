const todoListDataServices = require("../services/todoListDataServices");

/**
 * Purpose: Function which handles the request for create todoList
 * @param {*} req
 * @param {*} res
 * @returns
 */
const createList = async (req, res) => {
  try {
    const listData = await todoListDataServices
      .createList(req.body)
      .catch((error) => {
        throw error;
      });
    res.status(listData.statusCode).json({
      status: listData.statusCode,
      message: listData.message,
      data: listData.data,
    });
    // res.send('response')
  } catch (error) {
    res.send(error);
  }
};

/**
 * Purpose: Function which handles the request for get todoListData by id
 * @param {*} req
 * @param {*} res
 * @returns
 */
const getTodoList = async (req, res) => {
  console.log("hghyh",req,"sadas");
  try {
    const todoListData = await todoListDataServices
      .getTodoList(req.params)
      .catch((error) => {
        throw error;
      });
    res.status(todoListData.statusCode).json({
      status: todoListData.statusCode,
      message: todoListData.message,
      data: todoListData.data,
    });
    console.log(todoListData);
    
    // res.send('response')
  } catch (error) {
    res.send(error);
  }
};

/**
 * Purpose: Function which handles the request for get all data of todoList
 * @param {*} req
 * @param {*} res
 * @returns
 */
const getAllListData = async (req, res) => {
  try {
    const allData = await todoListDataServices
      .getAllListData()
      .catch((error) => {
        throw error;
      });
    res.status(allData.statusCode).json({
      status: allData.statusCode,
      message: allData.message,
      data: allData.data,
    });
    // res.send('response')
  } catch (error) {
    res.send(error);
  }
};

/**
 * Purpose: Function which handles the request for upadte todolistdata by id
 * @param {*} req
 * @param {*} res
 * @returns
 */
const updateTodoListData = async (req, res) => {
  try {
    const todoListData = await todoListDataServices
      .updateTodoListData(req.params, req.body)
      .catch((error) => {
        throw error;
      });
    res.status(todoListData.statusCode).json({
      status: todoListData.statusCode,
      message: todoListData.message,
      data: todoListData.data,
    });
    // res.send('response')
  } catch (error) {
    res.send(error);
  }
};

/**
 * Purpose: Function which handles the request for delete role
 * @param {*} req
 * @param {*} res
 * @returns
 */
const deleteTodoListData = async (req, res) => {
  try {
    const todolistdata = await todoListDataServices
      .deleteTodoListData(req.params)
      .catch((error) => {
        throw error;
      });
    res.status(todolistdata.statusCode).json({
      status: todolistdata.statusCode,
      message: todolistdata.message,
      data: todolistdata.data,
    });
    // res.send('response')
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  createList,
  getTodoList,
  getAllListData,
  updateTodoListData,
  deleteTodoListData,
};
