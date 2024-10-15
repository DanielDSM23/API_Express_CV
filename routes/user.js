const router = require('express').Router();
const userController = require('./../controllers/user');
const authController = require('./../controllers/auth');

const { verifyUser } = require('../middlewares/jwt');

router.get('/me', verifyUser, userController.getUserInfos);

router.get('/details/:id', authController.userDetails);

module.exports = router;
