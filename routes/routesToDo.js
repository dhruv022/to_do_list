const router = require('express').Router();

const apiController =  require("../controller/to_do_listApi");

router.post('/list', apiController.createList);
router.get('/list', apiController.allList);
router.get('/list/:id',apiController.listById);
router.put('/list/:id', apiController.listUpdate);
router.delete('/list/:id', apiController.listDelete);

module.exports = router;

