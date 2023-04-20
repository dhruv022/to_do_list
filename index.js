const express = require('express');
const app = express();
const dotenv = require('dotenv');
const toDoROutes = require('./routes/routesToDo');
const roleRoutes = require('./routes/routes');
const userRoutes = require('./routes/routesUsers');
const PORT = 3000; 
app.use(express.json());
dotenv.config();
app.use(userRoutes);
app.use(roleRoutes);
app.use(toDoROutes);


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
