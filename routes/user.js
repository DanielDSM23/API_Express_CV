const router = require('express').Router();
const userController = require('./../controllers/user');
const { verifyUser } = require('../middlewares/jwt');

router.get('/me', verifyUser, userController.getUserInfos);

router.get('/cv', verifyUser, userController.getUserBooks);

module.exports = router;
