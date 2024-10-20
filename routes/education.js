const router = require('express').Router();
const eduController = require('./../controllers/educations');
const { verifyUser } = require('../middlewares/jwt');

router.get('/:id', verifyUser, eduController.find);

router.post('/', verifyUser, eduController.create);

router.put('/:id', verifyUser, eduController.update);

router.delete('/:id', verifyUser, eduController.delete);

module.exports = router;
