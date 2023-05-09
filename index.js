const express = require("express");
const app = express();
var cors = require('cors');
require("dotenv").config();
// const mysql = require('mysql2');
// port declarations
const port = process.env.PORT || 5000;

// const knex = require('./config/db.config')

//parsing incoming request
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

//importing routes
const userRoutes = require("./routes/userRouter");
app.use("/users", userRoutes);
const userRolesRoutes = require("./routes/userRoles");
app.use("/roles", userRolesRoutes);
const todoListRoutes = require("./routes/todoListRoutes");
app.use("/todoList", todoListRoutes);

app.listen(port, () => console.log(`App is listening on ${port}`));

