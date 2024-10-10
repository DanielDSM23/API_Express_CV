const router = require('express').Router();
const autController = require('./../controllers/auth');

router.post('/register', autController.register);

router.post('/login', autController.login);

module.exports = router;
