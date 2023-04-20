const connection = require("../db_connection/dbConnection")

// {
//   "roleName": "Super Admin"
// }

//  API for post data to table
const roleCreate = async (req, res) => {
    const { roleName } = req.body;
    if (!roleName) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const createdAt = new Date();
    const updatedAt = new Date();
    const query = `INSERT INTO user_roles (roleName, createdAt, updatedAt) VALUES (?, ?, ?)`;
    const values = [roleName, createdAt, updatedAt];
    
    connection.query(query, values, (error, results, fields) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error inserting data into user_roles table');
      } else {
        console.log('Data inserted into user_roles table');
        res.status(200).send('Data inserted into user_roles table');
      }
    });
  };
  
  // Api for get all data from table
 const allRoles = async (req, res) => {
      const query = 'SELECT * FROM user_roles';
      connection.query(query, (err, results) => {
        if (err) {
          throw err;
        }
        res.json(results);
      });
    };

//Api for get data by Id from table
 const roleById = async (req, res) => {
    const id = req.params.id;
    const query = `SELECT * FROM user_roles WHERE id = ${id}`;
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

  //Api for update data in table
 const roleUpdate = async(req, res) => {
    const id = req.params.id;
    const { roleName } = req.body;
    if (!roleName) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const query = `UPDATE user_roles SET roleName = '${roleName}', updatedAt = NOW() WHERE id = ${id}`;
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
  
  const roleDelete= async(req, res) => {
    const id = req.params.id;
    const query = `DELETE FROM user_roles WHERE id = ${id}`;
    connection.query(query, (err, result) => {
      if (err) {
        throw err;
      }
      if (result.affectedRows === 0) {
        res.status(404).json({ message: 'User not found' });
      } else {
        res.json({ message: 'User deleted successfully' });
      }
    });
  };


  module.exports = {
    roleCreate,
    allRoles,
    roleById,
    roleUpdate,
    roleDelete
  }