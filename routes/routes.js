
const router = require('express').Router();

const apiController =  require("../controller/rolesApi");

router.post('/user_roles', apiController.roleCreate);
router.get('/user_roles', apiController.allRoles);
router.get('/user_roles/:id',apiController.roleById);
router.put('/user_roles/:id', apiController.roleUpdate);
router.delete('/user_roles/:id', apiController.roleDelete);

module.exports = router;
