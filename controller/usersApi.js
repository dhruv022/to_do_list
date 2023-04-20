const connection = require("../db_connection/dbConnection")
const { body, validationResult, ExpressValidator } = require('express-validator');
// {
//   "firstName": "Dhruv",
//   "lastName" :"Sharma",
//   "email":"dhruv02225@gmai.com",
//   "phoneNumber":"7651070617",
//   "password":"1234sdsds",
//   "status":1
// }

//  API for post data to table
const createUser = async (req, res) => {
  const validationRules = [
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('email').matches(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/).withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('phoneNumber').isMobilePhone().withMessage('Invalid phone number'),
    body('status').isIn(['1', '0']).withMessage('Status must be "0" or "1"'),
  ];
  await Promise.all(validationRules.map((rule) => rule.run(req)));
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
    const { firstName } = req.body;
    const { lastName } = req.body;
    const { email } = req.body;
    const { phoneNumber } = req.body;
    const { password } = req.body;
    const { status } = req.body;
    const createdAt = new Date();
    const updatedAt = new Date();
    const query = `INSERT INTO users (firstName, lastName, email, password, phoneNumber, status, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [firstName, lastName, email, phoneNumber, password, status, createdAt, updatedAt];
    
    connection.query(query, values, (error, results, fields) => {
      if (error) {
        console.error(error);
        res.status(500).send('Duplicate email address');
      } else {
        console.log('Data inserted into users table');
        res.status(200).send('Data inserted into users table');
      }
    });
  };

  // Api for get all data from table
  const allUsers = async (req, res) => {
    const query = 'SELECT * FROM users';
    connection.query(query, (err, results) => {
      if (err) {
        throw err;
      }
      res.json(results);
    });
  };
  
  //Api for get data from table by ID
  const userById = async (req, res) => {
    const id = req.params.id;
    const query = `SELECT * FROM users WHERE id = ${id}`;
    connection.query(query, (err, result) => {
      if (err) {
        throw err;
      }
      if (result.length === 0) {
        res.status(404).json({ message: 'User not found' });
      } else {
        res.json(result[0]);
      }
    });
  };

//Api for delete data
  const deleteUser = async (req, res) => {
    const id = req.params.id;
    const query = `DELETE FROM users WHERE id = ${id}`;
    connection.query(query, (err, result) => {
      if (err) {
        throw err;
      }
      if (result.affectedRows === 0) {
        res.status(404).json({ message: 'User not found' });
      } else {
        res.status(200).json({ message: 'User deleted' });
      }
    });
  };

  //Api for update data
  const updateUser = async (req, res) => {
    const id = req.params.id;
    const { firstName } = req.body;
    const { lastName } = req.body;
    const { email } = req.body;
    const { phoneNumber } = req.body;
    const { password } = req.body;
    const { status } = req.body;

    if (!firstName ||!lastName ||!email ||!phoneNumber ||!password ||!status) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    if (!/^\d{10}$/.test(phoneNumber)) {
      return res.status(400).json({ message: 'Invalid phone number' });
    }
    if (!/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/.test(email)) {
      return res.status(400).json({ message: 'Invalid email address' });
    }
    const query = `UPDATE users SET firstName = '${firstName}', lastName='${lastName}', email='${email}', phoneNumber='${phoneNumber}', password='${password}', status='${status}' updatedAt = NOW() WHERE id = ${id}`;
    connection.query(query, (err, result) => {
      if (err) {
        throw err;
      }
      if (result.affectedRows === 0) {
        res.status(404).json({ message: 'User not found' });
      } else {
        res.json({ message: 'User updated successfully' });
      }
    });
  };

  module.exports = {
    allUsers,
    createUser,
    userById,
    updateUser,
    deleteUser
  }

