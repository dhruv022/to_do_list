const connection = require("../db_connection/dbConnection")

// {
//   "title":"running",
//   "description":"at 8:00 am ",
//   "status":1
// }
// API for create todolist
const createList = async (req, res) => {
    const { title } = req.body;
    const { description } = req.body;
    const { status } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Title required' });
    }
   
    const createdAt = new Date();
    const updatedAt = new Date();
    const query = `INSERT INTO to_do_list_data (title, description, status, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)`;
    const values = [title, description, status, createdAt, updatedAt];
    
    connection.query(query, values, (error, results, fields) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error inserting data into to_do_list_data table');
      } else {
        console.log('Data inserted into to_do_list_data table');
        res.status(200).send('Data inserted into to_do_list_data table');
      }
    });
  };

// API for display todolist
const allList = async (req, res) => {
    const query = 'SELECT * FROM to_do_list_data';
    connection.query(query, (err, results) => {
      if (err) {
        throw err;
      }
      res.json(results);
    });
  };

// API for display todolist with id
const listById = async (req, res) => {
    const id = req.params.id;
    const query = `SELECT * FROM to_do_list_data WHERE id = ${id}`;
    connection.query(query, (err, result) => {
      if (err) {
        throw err;
      }
      if (result.length === 0) {
        res.status(404).json({ message: 'Data not found' });
      } else {
        res.json(result[0]);
      }
    });
  };

// API for update todo list
const listUpdate = async(req, res) => {
    const id = req.params.id;
    const { title } = req.body;
    const { description } = req.body;
    if (!title) {
      return res.status(400).json({ message: 'Title required' });
    }
    const query = `UPDATE to_do_list_data SET title = '${title}', description ='${description}', updatedAt = NOW() WHERE id = ${id}`;
    connection.query(query, (err, result) => {
      if (err) {
        throw err;
      }
      if (result.affectedRows === 0) {
        res.status(404).json({ message: 'Data not found' });
      } else {
        res.json({ message: 'Data updated successfully' });
      }
    });
  };
  
//API for delete todo
const listDelete= async(req, res) => {
    const id = req.params.id;
    const query = `DELETE FROM to_do_list_data WHERE id = ${id}`;
    connection.query(query, (err, result) => {
      if (err) {
        throw err;
      }
      if (result.affectedRows === 0) {
        res.status(404).json({ message: 'Data not found' });
      } else {
        res.json({ message: 'Data deleted successfully' });
      }
    });
  };

module.exports ={
    createList,
    allList,
    listById,
    listUpdate,
    listDelete
}

