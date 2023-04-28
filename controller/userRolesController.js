const userRolesServices = require("../services/userRolesServices");

/**
 * Purpose: Function which handles the request for create roles
 * @param {*} req
 * @param {*} res
 * @returns
 */
const createRole = async (req, res) => {
  try {
    const role = await userRolesServices.createRole(req.body).catch((error) => {
      throw error;
    });
    res.status(role.statusCode).json({
      status: role.statusCode,
      message: role.message,
      data: role.data,
    });
    // res.send('response')
  } catch (error) {
    res.send(error);
  }
};

/**
 * Purpose: Function which handles the request for get role by id
 * @param {*} req
 * @param {*} res
 * @returns
 */
const getRole = async (req, res) => {
  try {
    const userRole = await userRolesServices
      .getRole(req.params)
      .catch((error) => {
        throw error;
      });
    res.status(userRole.statusCode).json({
      status: userRole.statusCode,
      message: userRole.message,
      data: userRole.data,
    });
    // res.send('response')
  } catch (error) {
    res.send(error);
  }
};

/**
 * Purpose: Function which handles the request for get all roles
 * @param {*} req
 * @param {*} res
 * @returns
 */
const getAllRole = async (req, res) => {
  try {
    const role = await userRolesServices.getAllRole().catch((error) => {
      throw error;
    });
    res.status(role.statusCode).json({
      status: role.statusCode,
      message: role.message,
      data: role.data,
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
const deleteRole = async (req, res) => {
  try {
    const userRole = await userRolesServices
      .deleteRole(req.params)
      .catch((error) => {
        throw error;
      });
    res.status(userRole.statusCode).json({
      status: userRole.statusCode,
      message: userRole.message,
      data: userRole.data,
    });
    // res.send('response')
  } catch (error) {
    res.send(error);
  }
};

/**
 * Purpose: Function which handles the request for upadte role by id
 * @param {*} req
 * @param {*} res
 * @returns
 */
const updateRole = async (req, res) => {
  try {
    const userRole = await userRolesServices
      .updateRole(req.params, req.body)
      .catch((error) => {
        throw error;
      });
    res.status(userRole.statusCode).json({
      status: userRole.statusCode,
      message: userRole.message,
      data: userRole.data,
    });
    // res.send('response')
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  createRole,
  getRole,
  getAllRole,
  updateRole,
  deleteRole,
};
