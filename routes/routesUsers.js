
const router = require('express').Router();

const apiController =  require("../controller/usersApi");

router.post('/users', apiController.createUser);
router.get('/users', apiController.allUsers);
router.get('/users/:id',apiController.userById);
router.put('/users/:id', apiController.updateUser);
router.delete('/users/:id', apiController.deleteUser);

module.exports = router;
