const router = require('express').Router();
const revController = require('./../controllers/review');
const { verifyUser } = require('../middlewares/jwt');

//router.get('/', verifyUser, revController.getAllEducations);

router.get('/:id', verifyUser, revController.find);

router.post('/', verifyUser, revController.create);

router.put('/:id', verifyUser, revController.update);

router.delete('/:id', verifyUser, revController.delete);

module.exports = router;
