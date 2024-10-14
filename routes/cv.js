const router = require('express').Router();
const cvController = require('./../controllers/cv');
const { verifyUser } = require('../middlewares/jwt');

router.get('/', cvController.findAll);

router.get('/:id', verifyUser, cvController.findOneById);

router.post('/', verifyUser, cvController.create);

router.put('/:id', verifyUser, cvController.update);

router.delete('/:id', verifyUser, cvController.delete);

module.exports = router;
